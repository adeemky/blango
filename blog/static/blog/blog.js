class PostRow extends React.Component {
  render() {
    const { post } = this.props;

    const thumbnail = post.hero_image.thumbnail ? (
      <img src={post.hero_image.thumbnail} alt="Thumbnail" />
    ) : (
      '-'
    );

    return (
      <tr>
        <td>{post.title}</td>
        <td>{thumbnail}</td>
        <td>{post.tags.join(', ')}</td>
        <td>{post.slug}</td>
        <td>{post.summary}</td>
        <td>
          <a href={`/post/${post.slug}/`}>View</a>
        </td>
      </tr>
    );
  }
}

class PostTable extends React.Component {
  state = {
    dataLoaded: false,
    data: null,
  };

  componentDidMount() {
    fetch(this.props.url).then(response => {
        if (response.status !== 200) {
          throw new Error('Invalid status from server: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          dataLoaded: true,
          data: data,
        });
      })
      .catch((e) => {
        console.error(e);
        this.setState({
          dataLoaded: true,
          data: {
            results: [],
          },
        });
      });
  }

  render() {
    const { dataLoaded, data } = this.state;

    let rows;
    if (dataLoaded) {
      if (data && data.results.length) {
        rows = data.results.map((post) => (
          <PostRow post={post} key={post.id} />
        ));
      } else {
        rows = (
          <tr>
            <td colSpan="6">No results found.</td>
          </tr>
        );
      }
    } else {
      rows = (
        <tr>
          <td colSpan="6">Loading&hellip;</td>
        </tr>
      );
    }

    return (
      <table className="table table-striped table-bordered mt-2">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Tags</th>
            <th>Slug</th>
            <th>Summary</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

const domContainer = document.getElementById('react_root');
ReactDOM.render(
  React.createElement(
    PostTable,
    {url: postListUrl}
  ),
  domContainer
)
