import { useState } from "react";

export default function useId() {
  const getId = () => {
    const IdString = sessionStorage.getItem("Id");
    const userId = JSON.parse(IdString);
    return userId;
  };

  const [Id, setId] = useState(getId());

  const saveId = (userId) => {
    sessionStorage.setItem("Id", JSON.stringify(userId));
    setId(userId.Id);
  };

  return {
    setId: saveId,
    Id,
  };
}
