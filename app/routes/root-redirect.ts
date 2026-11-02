import { redirect } from "react-router";

export function loader() {
  return redirect("/fa", { status: 301 });
}
