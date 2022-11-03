import React from "react";
import Editcontent from "../../components/content/editcontent";
import { useRouter } from "next/router";
import Maineditcontent from "../../components/content/editcontent";
function Contents() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Maineditcontent id={id} />
    </div>
  );
}

export default Contents;
