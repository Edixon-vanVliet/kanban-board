import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-regular-svg-icons";

export const tags = Object.freeze({
  seo: "SEO",
  longForm: "Long Form",
  blogPost: "Blog Post",
});

export const tagIcons = Object.freeze({
  [tags.seo]: <FontAwesomeIcon icon={faMagnifyingGlass} key={tags.seo} title={tags.seo} />,
  [tags.longForm]: <FontAwesomeIcon icon={faClipboardList} key={tags.longForm} title={tags.longForm} />,
  [tags.blogPost]: <FontAwesomeIcon icon={faComments} key={tags.blogPost} title={tags.blogPost} />,
});
