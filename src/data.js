import { tags } from "./utils/tags";
import { statuses } from "./utils/statuses";

export const todos = [
  {
    id: 1,
    title: "Card 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum, ligula vel fringilla convallis, dolor mauris pellentesque mauris, eu imperdiet tortor erat vitae arcu.",
    tags: [tags.longForm, tags.blogPost],
    assignee: "Edixon",
    due: "2022-11-01",
    status: statuses.todo,
  },
  {
    id: 2,
    title: "Card 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum, ligula vel fringilla convallis, dolor mauris pellentesque mauris, eu imperdiet tortor erat vitae arcu.",
    tags: [tags.longForm, tags.blogPost],
    assignee: "Edixon",
    due: "2022-11-01",
    status: statuses.todo,
  },
  {
    id: 3,
    title: "Card 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum, ligula vel fringilla convallis, dolor mauris pellentesque mauris, eu imperdiet tortor erat vitae arcu.",
    tags: [tags.seo],
    assignee: "Bleyly",
    due: "2022-11-01",
    status: statuses.todo,
  },
  {
    id: 4,
    title: "Card 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum, ligula vel fringilla convallis, dolor mauris pellentesque mauris, eu imperdiet tortor erat vitae arcu.",
    tags: [tags.seo],
    assignee: "Jhon",
    due: "2022-11-01",
    status: statuses.todo,
  },
  {
    id: 5,
    title: "Card 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum, ligula vel fringilla convallis, dolor mauris pellentesque mauris, eu imperdiet tortor erat vitae arcu.",
    tags: [tags.longForm, tags.blogPost],
    assignee: "Miguel",
    due: "2022-11-01",
    status: statuses.todo,
  },
];
