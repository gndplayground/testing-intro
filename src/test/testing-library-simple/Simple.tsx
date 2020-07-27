import React from "react";

type SimpleProps = {
  name?: string;
};

function Simple({ name }: SimpleProps) {
  return (
    <section>
      <p>Hello{name && `, ${name}!`}</p>
    </section>
  );
}

export default Simple;
