import { fireEvent, render, screen, waitFor , act} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./components/Home";
import App from "./App";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import DisplayBikes from "./components/DisplayBikes";
import ApplyForm from "./components/ApplyForm";


test("renders_home_component_with_title_and_description", () => {
  render(<App />);

  const titleElement = screen.getByText("Welcome to Faster Bike Taxi");
  const descriptionElement = screen.getByText(
    "Apply now to become a bike taxi driver and start earning!"
  );

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});

test("renders_apply_now_button_with_link_to_apply", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  const applyButton = screen.getByText("Apply Now");
  const linkElement = applyButton.closest('a');

  expect(applyButton).toBeInTheDocument();
  expect(linkElement).toHaveAttribute("href", "/apply");
});

test("renders_navbar_component_with_links", () => {
  render(<App />);

  const titleElement = screen.getByText("Faster Bike Taxi");
  const homeLink = screen.getByText("Home");
  const bikeDetailsLink = screen.getByText("Bike Details");

  expect(titleElement).toBeInTheDocument();
  expect(homeLink).toBeInTheDocument();
  expect(bikeDetailsLink).toBeInTheDocument();
});

test("checks_link_destinations", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  const homeLink = screen.getByText("Home");
  const bikeDetailsLink = screen.getByText("Bike Details");

  expect(homeLink).toHaveAttribute("href", "/");
  expect(bikeDetailsLink).toHaveAttribute("href", "/bikedetails");
});

test("renders_footer_component_with_copyright_text", () => {
  render(<Footer />);

  const copyrightText = screen.getByText(
    /Faster Bike Taxi. All rights reserved./i
  );

  expect(copyrightText).toBeInTheDocument();
});

test("fetching_and_displaying_bike_applications", async () => {
  const MOCK_DATA = [
    {
      name: "John Doe",
      bikeNumber: "B123",
      age: 30,
      phoneNumber: "1234567890",
    },
    {
      name: "Alice Smith",
      bikeNumber: "B456",
      age: 28,
      phoneNumber: "9876543210",
    },
  ];

  const fetchMock = jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(MOCK_DATA),
  });

  render(<DisplayBikes />);

  await waitFor(() => {
    MOCK_DATA.forEach((application) => {
      expect(screen.getByText(application.name)).toBeInTheDocument();
      expect(screen.getByText(application.bikeNumber)).toBeInTheDocument();
      expect(screen.getByText(application.age.toString())).toBeInTheDocument();
      expect(screen.getByText(application.phoneNumber)).toBeInTheDocument();
    });
  });

  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining("/getAllBiketaxi"),
    expect.objectContaining({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
  fetchMock.mockRestore();
});

test("submits_valid_application_form", async () => {
  const fetchMock = jest.spyOn(global, "fetch").mockResolvedValue({ ok: true });
  
  render(<ApplyForm />);

  const nameInput = screen.getByLabelText("Name:");
  const bikenumberInput = screen.getByLabelText("Bike Number:");
  const ageInput = screen.getByLabelText("Age:");
  const phonenumberInput = screen.getByLabelText("Phone Number:");
  const submitButton = screen.getByText("Submit Application");

  await act(async () => {
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(bikenumberInput, { target: { value: "B123" } });
    fireEvent.change(ageInput, { target: { value: "25" } });
    fireEvent.change(phonenumberInput, { target: { value: "1234567890" } });
  });

  expect(nameInput).toHaveValue("John Doe");
  expect(bikenumberInput).toHaveValue("B123");
  expect(ageInput).toHaveValue(25);
  expect(phonenumberInput).toHaveValue("1234567890");

  await act(async () => {
    fireEvent.click(submitButton);
  });

  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining("/addBiketaxi"),
    expect.objectContaining({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: expect.any(String),
    })
  );

  await waitFor(() => {
    expect(screen.getByText("Your application has been submitted successfully!")).toBeInTheDocument();
  });

  fetchMock.mockRestore();
});

test("submits_invalid_application_form", () => {
  render(<ApplyForm />);

  const submitButton = screen.getByText("Submit Application");
  fireEvent.click(submitButton);

  expect(screen.getByText("Name is required")).toBeInTheDocument();
  expect(screen.getByText("Bike Number is required")).toBeInTheDocument();
  expect(screen.getByText("Age is required")).toBeInTheDocument();
  expect(screen.getByText("Phone Number is required")).toBeInTheDocument();
});

test("checks_all_components_and_routes", () => {
  render(<App />);
  
  const homeLink = screen.getByText(/Home/i);
  fireEvent.click(homeLink);
  expect(screen.getByText("Welcome to Faster Bike Taxi")).toBeInTheDocument();
  
  const applyLink = screen.getByText("Apply Now");
  expect(applyLink).toBeInTheDocument();
  fireEvent.click(applyLink);
  expect(screen.getByText("Apply to Join")).toBeInTheDocument();

  const bikeDetailsLink = screen.getByText("Bike Details");
  expect(bikeDetailsLink).toBeInTheDocument();
  fireEvent.click(bikeDetailsLink);
  expect(screen.getByText("Submitted Applications")).toBeInTheDocument();
});