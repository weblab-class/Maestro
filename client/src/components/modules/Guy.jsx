import "./Guy.css";

/**
 * Guy is a container for guy documents. These contain an emoticon and a sound.
 *
 * Proptypes
 * @param {Object} guy
 * @param {String} key
 * @param {Function} onGuyClick
 */
const Guy = (props) => {
  const guy = props.guy;

  return (
    <button className="guy-button tooltip" width="120" height="120">
      <span className="tooltiptext">{guy.guy_name + " by " + guy.creator_id} </span>
      <img
        className="guy-icon"
        src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${guy.asset_id}/512.webp`}
        onClick={props.onGuyClick(guy)}
        width="100"
        height="100"
      />
    </button>
  );
};

export default Guy;
