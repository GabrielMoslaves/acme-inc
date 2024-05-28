import { render, screen, waitFor } from "@testing-library/react";
import App from "../../App";



test("should blabla", async () => {
  render(<App />);
  //find é assincrono
  const card = await screen.findByTestId("card.0");

  expect(card).toBeInTheDocument();
});
