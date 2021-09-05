import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import axios from "axios";
import config from "../../../config";
import qs from "qs";

export default class Discover extends Component {
  constructor() {
    super();
    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }

  //Function to make API requests
  async makeRequest(path) {
    //Generates Access Token
    const {
      data: { access_token: token },
    } = await axios.post(
      config.api.authUrl,
      qs.stringify({ grant_type: "client_credentials" }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            `${config.api.clientId}:${config.api.clientSecret}`
          )}`,
        },
      }
    );

    //Gets the data
    const res = await axios.get(
      `${config.api.baseUrl}/browse/${path}?locale=en_US`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res;
  }

  //Fetch functions
  async fetchNewReleases() {
    const result = this.makeRequest("new-releases");
    return result;
  }

  async fetchFeaturedPlaylists() {
    const result = this.makeRequest("featured-playlists");
    return result;
  }

  async fetchCategories() {
    const result = this.makeRequest("categories");
    return result;
  }

  //Handlers
  handleNewReleases = (result) => {
    this.setState({ newReleases: result.data.albums.items });
  };

  handleFeaturedPlaylists = (result) => {
    this.setState({ playlists: result.data.playlists.items });
  };

  handleCategories = (result) => {
    this.setState({ categories: result.data.categories.items });
  };

  async componentDidMount() {
    await Promise.all([
      this.fetchNewReleases().then(this.handleNewReleases),
      this.fetchFeaturedPlaylists().then(this.handleFeaturedPlaylists),
      this.fetchCategories().then(this.handleCategories),
    ]);
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
