import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { setGlobalState } from "../store";

const Description = ({ detail, descriptionComments }) => {
  const [searchTitles, setSearchTitles] = useState([]);
  const [mainDetail, setMainDetail] = useState(detail);

  const write = () => {
    //get highlighted text
    let text = window.getSelection().toString();
    //check text and open comment form
    if (text.length > 0) {
      setGlobalState("commentFormModal", "scale-100");
      setGlobalState("commentType", "description");
      setGlobalState("highlightedTitle", text.trim());
    }
  };

  useEffect(() => {
    //get the titles
    let newArray = [];
    descriptionComments.forEach((comment) => {
      newArray = [...newArray, comment.title];
    });

    setSearchTitles(newArray);
  }, [descriptionComments]);

  // console.log(searchTitles, descriptionComments);
  return (
    <p onMouseUp={write} className="text-rnBlack text-sm text-justify py-2">
      {detail.description && (
        <Highlighter
          highlightClassName="YourHighlightClass"
          searchWords={searchTitles}
          autoEscape={true}
          highlightStyle={{
            backgroundColor: "inherit",
            textDecoration: "underline",
            textDecorationColor: "#F8EED5",
            textDecorationThickness: "3px",
          }}
          textToHighlight={detail.description}
        />
      )}
    </p>
  );
};

export default Description;
