import { render, act, fireEvent } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import ShareReport from "../../../components/dashboard/ShareReport/ShareReport";
import { ReportProvider } from "../../../contexts/reports";
import { getUserFromCompany } from "../../../components/services/company-api";
import { CompanyUserProvider } from "../../../contexts/companyuser";

const closeDialogs = () => {
    return true;
  };

const closeDialogsDeleteAndUpdate = () => {
  return (
    200,
    "Report changed sucessfully!",
    "You do not have the permission to change this report!"
  );
};

const companyUsers = [
  {
      name: "Test User CX Admin",
      email: "cxadmin@cx.com",
      companyName: "CX-Test-Access",
   },
   {
      name: "Test User CX User",
      email: "cxuser@cx.com",
      companyName: "CX-Test-Access",
   }
  ];

jest.mock("../../../components/services/company-api", () => ({
  getUserFromCompany: jest.fn(() => companyUsers),
}));

test("Share Report Tests", async () => {
  getUserFromCompany.mockImplementation(() => Promise.resolve(companyUsers));
    let getByLabelText;
    let getByTestId;
    let getByText;
    await act(async () => {
      ({ getByLabelText, getByTestId, getByText } = render(
        <CompanyUserProvider>
          <ReportProvider>
            <ShareReport
              closeDialogs={closeDialogs}
              closeDialogsDeleteAndUpdate={closeDialogsDeleteAndUpdate}
            ></ShareReport>
          </ReportProvider>
        </CompanyUserProvider>
      ));
    });
  
    const shareBtn = getByText("Share");
    await act(async () => {
      fireEvent.click(shareBtn);
    });
    expect(shareBtn).toBeInTheDocument();
  });

  test("Close Share Report", async () => {
    getUserFromCompany.mockImplementation(() => Promise.resolve(companyUsers));
      let getByLabelText;
      let getByTestId;
      let getByText;
      await act(async () => {
        ({ getByLabelText, getByTestId, getByText } = render(
          <CompanyUserProvider>
            <ReportProvider>
              <ShareReport
                closeDialogs={closeDialogs}
                closeDialogsDeleteAndUpdate={closeDialogsDeleteAndUpdate}
              ></ShareReport>
            </ReportProvider>
          </CompanyUserProvider>
        ));
      });
    
      const shareBtn = getByText("Close");
      await act(async () => {
        fireEvent.click(shareBtn);
      });
      expect(shareBtn).toBeInTheDocument();
    });
