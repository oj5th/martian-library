import React from "react";
import { Mutation } from "react-apollo";
import { LibraryQuery } from '../Library/operations.graphql';
import { AddItemMutation } from "./operations.graphql";
import ProcessItemForm from "../ProcessItemForm";

const AddItemForm = () => (
  <Mutation mutation={AddItemMutation}>
    {(addItem, { loading }) => (
      <ProcessItemForm
        buttonText="Add Item"
        loading={loading}
        // Update library query after Mutation will be finished
        onProcessItem={({ title, description, imageUrl }) =>
          addItem({
            variables: {
              title,
              description,
              imageUrl
            },
            update: (cache, { data: { addItem } }) => {
              const item = addItem.item;
              if (item) {
                const currentItems = cache.readQuery({ query: LibraryQuery });
                cache.writeQuery({
                  query: LibraryQuery,
                  data: {
                    items: [item].concat(currentItems.items),
                  },
                });
              }
            },
          })
        }
      />
    )}
  </Mutation>
);

export default AddItemForm;
