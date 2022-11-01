import React from "react";
import Editcontent from "../../components/content/editcontent";
import { useRouter } from "next/router";
function Contents() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Editcontent id={id} />
    </div>
  );
}

export default Contents;
