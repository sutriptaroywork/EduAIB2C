import "@testing-library/jest-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import CustomAccordion from "../components/CustomAccordion";
import Setting from "../pages/setting";
import { connect } from "formik";
import { image } from "next/image"
import { link } from "fs";
import { fromJS } from "immutable";
import SettingProfileComp from "../components/SettingComps/SettingProfileComp";
import SettingChangePasswordComp from '../components/SettingComps/SettingChangePasswordComp';
import * as Yup from 'yup';



//for all the buttons
describe("test", () => {
  it("renders a test for easy button", () => {
    render(<Setting />);
    expect(screen.queryByTestId("profile_setting")).toBeInTheDocument();
    expect(screen.queryByTestId("change_password")).toBeInTheDocument();
    expect(screen.queryByTestId("notification")).toBeInTheDocument();
    expect(screen.queryByTestId("subscription")).toBeInTheDocument();
    expect(screen.queryByTestId("help_support")).toBeInTheDocument();
    expect(screen.queryByTestId("Earn_refer")).toBeInTheDocument();
  });
});
describe("test", () => {
  it("renders a test for easy tab button", () => {
    render(<Setting />);
    expect(screen.queryByTestId("tab1")).toBeInTheDocument();
    expect(screen.queryByTestId("tab2")).toBeInTheDocument();
    expect(screen.queryByTestId("tab3")).toBeInTheDocument();
    expect(screen.queryByTestId("tab4")).toBeInTheDocument();
    expect(screen.queryByTestId("tab5")).toBeInTheDocument();
    expect(screen.queryByTestId("tab6")).toBeInTheDocument();
    expect(screen.queryByTestId("update_btn")).toBeInTheDocument();
  });
});
 
// for all the text and heading
test("renders text correctly", () => {
  render(<Setting />);
  const textElement = screen.getByTestId("refer_title", "earn_title");
  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveTextContent("shikshaML Referral Program", "Let's Learn and Earn together!");
});
// test for images
test("renders images correctly", () => {
  render(<Setting />);
  const imageElement = screen.getByTestId("chips_img", "background_img", "gift_img", "profile_img");
  expect(imageElement).toBeInTheDocument();
});
// test for Function btn callToHandle
function testButtonClick(buttonName) {
  test(`renders a test for calling function of submit btn - ${buttonName}`, () => {
    render(<Setting />);
    const submitButton = screen.getByRole("button", {
      name: buttonName,
    });
    fireEvent.click(submitButton);
  });
}
const buttonNames = [
  "Profile Setting",
  "Change Password",
  "Notification",
  "Subscription",
  "Help and Support",
  "Earn & Refer",
  "My Reward",
];

buttonNames.forEach((buttonName) => {
  testButtonClick(buttonName);
});

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));


// For all Label and fields 
const labelsAndAttributes = [
  { text: 'Full name', for: 'Full name' },
  { text: 'Date of birth', for: 'selectedDate' },
  { text: 'Gender', for: 'gender' },
  { text: 'Grade/Class', for: 'grade' },
  { text: 'State', for: 'state' },
  { text: 'City', for: 'city' },
  { text: 'School/Institute', for: 'insititute' },
  { text: 'Referral code', for: 'referralCode' },
];
 
labelsAndAttributes.forEach(({ text, forAttr }) => {
  test(`Label for ${text}`, () => {
    render(<SettingProfileComp />);
    const label = screen.getByText(text);

    // Check if the label is in the document
    expect(label).toBeInTheDocument();

    // Check the label's attributes
    expect(label).toHaveAttribute('for', forAttr);
  });
});


// for change password page 
test('Form validation for Password Matching', () => {
  render(<SettingChangePasswordComp />);
  const updateButton = screen.getByTestId('update_btn');

  fireEvent.change(screen.getByLabelText('New password'), { target: { value: 'password123' } });
  fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'password456'} });
  fireEvent.click(updateButton);
});
// for submission password
test('Form submission', () => {
  render(<SettingChangePasswordComp />);
  const updateButton = screen.getByTestId('update_btn');
  fireEvent.change(screen.getByLabelText('Current Password'), { target: { value: 'currentPass' } });
  fireEvent.change(screen.getByLabelText('New password'), { target: { value: 'newPass123' } });
  fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'newPass123' }});
  fireEvent.click(updateButton);
});
// password validation
describe("SettingChangePasswordComp", () => {
  it("should validate the New Password field", async () => {
    render(<SettingChangePasswordComp />);
    const passwordInput = screen.getByPlaceholderText("Enter your new password");

    // Invalid input (less than 6 characters)
    fireEvent.change(passwordInput, { target: { value: "Short" } });

    // Valid input
    fireEvent.change(passwordInput, { target: { value: "ValidPassword" } });
    expect(screen.queryByText("Password must be at least 6 characters")).toBeNull();

  });
});