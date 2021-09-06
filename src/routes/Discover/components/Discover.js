import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import getToken from "../../../api/getToken";
import getData from "../../../api/getData";

export default class Discover extends Component {
  constructor() {
    super();
    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }

  //Fetch requests
  fetchNewReleases = async () => getData("new-releases", await getToken());

  fetchFeaturedPlaylists = async () =>
    getData("featured-playlists", await getToken());

  fetchCategories = async () => getData("categories", await getToken());

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

  //Fetch data, set state on mounting
  async componentDidMount() {
    this.fetchNewReleases().then(this.handleNewReleases);
    this.fetchFeaturedPlaylists().then(this.handleFeaturedPlaylists);
    this.fetchCategories().then(this.handleCategories);
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
