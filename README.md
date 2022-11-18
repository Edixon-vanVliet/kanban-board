# Kanban Board

## Requirements

- The latest version of React should be used.
- Hooks only. This means, no classes are allowed.
- `Emotion-js` for styling.
- `Persistence`: cards should be stored in the `local_storage` and you should simulate `5 seconds` of delay while fetching the list of cards.
- Please use Skeleton while fetching cards.
- Unit Testing: At least two main components(i.e `Creation form` and `Filters`).

## Exercise

1.  Implement a Kanban Board with three columns, "To Do", "In Progress" and "Done" where users can `add`, `edit`, and `delete` issues (Cards). When a user adds a new card, this one should be placed at the bottom of the "To Do" column.

    - The forms to `create` and `delete` cards should be placed in a `modal`.
    - A `confirmation modal` should be displayed before deleting a card.

    Every card should have the following fields:

    - Title
    - Description
    - Tag (SEO, Long Form, Blog Post)
    - Assignee
    - Due Date

2.  Implement the `drag and drop` functionality where users should be able to select `one or multiple` cards and move them from one column to another. When dropping one or more cards into a column containing other cards, the new cards should be added at the bottom, keeping the same order they had before. (You can use a lib)
3.  Implement a `search` to filter cards based on the following fields:
    - Title
    - Assignee
    - Tags
