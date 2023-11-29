const S3_URL = "https://d3gxipca0cw0l2.cloudfront.net";

module.exports = {
  forgotPasswordHTML: (heading, code, year) => {
    return `
    <table
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    padding: 20px 60px;
    font-family: 'Open Sans', sans-serif;
    border-collapse: collapse;
    margin: 0 auto;
  "
>
  <tbody>    
    <tr>
      <td>
        <p style="font-weight: 700; font-size: 18px">
        ${heading}
        </p>
      </td>
    </tr>
    
    <tr
      class="box"
      style="
        font-family: 'Open Sans', sans-serif;
        width: 50%;
        border: 1px solid #d8d8d8;
        margin: 0 auto;
        font-size: 20px;
      "
    >
      <td>
        <p style="margin: 10px 20px">
          Verification code:
          <span
            class="code"
            style="
              font-style: italic;
              font-size: 22px;
              font-weight: 700;
              cursor: pointer;
            "
            >${code}</span
          >
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p style="">
          Submit a verification code above to reset your password.
        </p>
      </td>
    </tr>

    <tr>
      <td>
        <hr
          style="margin: 20px 0; width: 100%; border-top: 1px solid #d8d8d8"
        />
      </td>
    </tr>
    <tr>
      <td>
      <p style="font-family: &quot;Open Sans&quot;, sans-serif;font-size: 20px;font-weight: 700;">
      <span style="color: black;">${
        year ? `${year} ` : ""
      }</span><span style="color: #003e7f">NANO<span><span style="color: #16aee5">scientific</span>
        </span></span>
      </p>
      </td>
    </tr>
    <tr>
      <td>
        <p style="font-size: 12px;">
          <span>
            NANOscientific plans are underway to continue the excitement that comes
            from scientific innovation and discovery with a new line up for ${
              year ? `${year} ` : ""
            }
          </span>
          <span>
            Stay tuned for the ${
              year ? `${year} ` : ""
            }NANOscientific Event Calendar for your chance to
            network with leading experts who are pioneering the evolution of
            scientific discovery at NANOscientific Conferences Worldwide.
          </span> 
        </p>
      </td>
    </tr>
    
    <tr>
      <td>
        <p
          class="desc-wrap text-center"
          style="font-family: 'Open Sans', sans-serif; font-size: 12px"
        >
          <a
            href="https://event.nanoscientific.org"
            target="_blank"
            style="
              
              font-size: 15px;
              color: black;
              font-weight: 700;
              text-decoration: none;
            "
            >https://event.nanoscientific.org</a
          >
        </p>
      </td>
    </tr>
  </tbody>
</table>`;
  },
  abstractMailHTML: (formData, year, attachments) => {
    const {
      psAbstractTitle,
      abstractDescription,
      Salutation,
      FirstName,
      LastName,
      Company,
      Department,
      Email,
      Phone,
      Country,
      State,
      psApplications,
      psExistingAFMBrand,
      psPresentationForm,
    } = formData;

    const attachmentHTMLList = [];
    if (attachments) {
      for (let i = 0; i < attachments.length; i += 1) {
        attachmentHTMLList.push(`
        <a href="${S3_URL + "/" + attachments[i].path}">Attachment ${i + 1}</a>
        `);
      }
    }

    return `<body class="text-center">
    <div style="padding: 20px 60px;font-family: &quot;Open Sans&quot;, sans-serif;">
      <h3>Abstract Submission Received (${
        psPresentationForm ? psPresentationForm : "Poster"
      })</h3>
      <div class="box" style="font-family: &quot;Open Sans&quot;, sans-serif;width: 50%;border: 1px solid #d8d8d8;margin: 0 auto;padding: 10px 20px;font-size: 14px;">
        <ul>
          <li>Presentation Form: ${
            psPresentationForm ? psPresentationForm : "Poster"
          }</li>
          <li>Topic: ${psAbstractTitle}</li>
          ${
            abstractDescription
              ? `<li>Abstract Description: ${abstractDescription}</li>`
              : ""
          }
          ${Email ? `<li>Email Address: ${Email}</li>` : ""} 
          <li>Name: ${
            Salutation ? Salutation : ""
          } ${FirstName} ${LastName}</li>
          <li>Company/Organization: ${Company}</li>
          <li>Department: ${Department ? Department : "N/A"}</li>
          <li>Contact Number: ${Phone}</li>
          ${Country ? `<li>Country/Region: ${Country}</li>` : ""}
          ${State ? `<li>State/Province: ${State}</li>` : ""}
          ${psApplications ? `<li>Application: ${psApplications}</li>` : ""}
          ${
            psExistingAFMBrand
              ? `<li>Using AFM Model: ${psExistingAFMBrand}</li>`
              : ""
          }
        </ul>
      </div>
      ${
        !attachments
          ? `<div style="margin-top: 20px">
        Please check attachment.
        </div>`
          : ``
      }
      ${attachments ? attachmentHTMLList.map((a) => a) : ``}
      <hr style="margin: 20px 0;width: 100%;border-top: 1px solid #d8d8d8;">
      <div class="comming-title" style="font-family: &quot;Open Sans&quot;, sans-serif;font-size: 20px;font-weight: 700;">
      <span syle="color: black;">${
        year ? `${year} ` : ""
      }</span><span style="color: #003e7f">NANO<span><span style="color: #16aee5">scientific</span>
      </span></span></div>  
      <div class="desc-wrap text-center" style="font-family: &quot;Open Sans&quot;, sans-serif;font-size: 12px;">
        <span class="desc desc-1">
          NANOscientific plans are underway to continue the excitement that comes
          from scientific innovation and discovery with a new line up for ${
            year ? `${year} ` : ""
          }
        </span>
        <span class="desc desc-2">
          Stay tuned for the ${
            year ? `${year} ` : ""
          }NANOscientific Event Calendar for your chance to
          network with leading experts who are pioneering the evolution of
          scientific discovery at NANOscientific Conferences Worldwide.
        </span>
      </div>
      <a href="https://event.nanoscientific.org/" target="_blank" style="margin-top: 20px; font-size: 13px">https://event.nanoscientific.org/
    </a></div>
  </body>
  `;
  },
  registrationAlertHTML: (formData, year) => {
    const {
      Salutation,
      FirstName,
      LastName,
      Company,
      Department,
      Email,
      Phone,
      Country,
      psDietaryInformation,
      psDietaryInformationOthers,
      psnsforumregistrationq01,
      psnsforumregistrationq02,
      psnsforumregistrationq03,
      psnsforumregistrationq04,
      psnsforumregistrationq05,
      psnsforumregistrationq06,
      psFamtParticipationType,
    } = formData;

    return `<body class="text-center">
    <div style="padding: 20px 60px;font-family: &quot;Open Sans&quot;, sans-serif;">
      <h3>Registration Received</h3>
      <div class="box" style="font-family: &quot;Open Sans&quot;, sans-serif;width: 50%;border: 1px solid #d8d8d8;margin: 0 auto;padding: 10px 20px;font-size: 14px;">
        <ul>
          ${
            psFamtParticipationType
              ? `<li>Registration Type: ${psFamtParticipationType}</li>`
              : ``
          }
          ${Email ? `<li>Email Address: ${Email}</li>` : ""} 
          <li>Name: ${
            Salutation ? Salutation : ""
          } ${FirstName} ${LastName}</li>
          <li>Company/Organization: ${Company}</li>
          <li>Department: ${Department ? Department : "N/A"}</li>
          <li>Contact Number: ${Phone}</li>
          ${Country ? `<li>Country/Region: ${Country}</li>` : ""}
          ${
            psDietaryInformation
              ? `<li>Dietary requirements: ${psDietaryInformation}</li>`
              : ``
          }
          ${
            psDietaryInformationOthers
              ? `<li>Dietary requirements: ${psDietaryInformationOthers}</li>`
              : ``
          }
          ${
            psnsforumregistrationq01
              ? `<li>Hands On Session #1: ${psnsforumregistrationq01}</li>`
              : ``
          }
          ${
            psnsforumregistrationq02
              ? `<li>Hands On Session #2: ${psnsforumregistrationq02}</li>`
              : ``
          }
          ${
            psnsforumregistrationq03
              ? `<li>Hands On Session #3: ${psnsforumregistrationq03}</li>`
              : ``
          }
          ${
            psnsforumregistrationq04
              ? `<li>Hands On Session #4: ${psnsforumregistrationq04}</li>`
              : ``
          }
          ${
            psnsforumregistrationq05
              ? `<li>Hands On Session #5: ${psnsforumregistrationq05}</li>`
              : ``
          }
          ${
            psnsforumregistrationq05
              ? `<li>Hands On Session #5: ${psnsforumregistrationq05}</li>`
              : ``
          }
          
        </ul>
      </div>
      <hr style="margin: 20px 0;width: 100%;border-top: 1px solid #d8d8d8;">
      <div class="comming-title" style="font-family: &quot;Open Sans&quot;, sans-serif;font-size: 20px;font-weight: 700;">
      <span syle="color: black;">${
        year ? `${year} ` : ""
      }</span><span style="color: #003e7f">NANO<span><span style="color: #16aee5">scientific</span>
      </span></span></div>  
      <div class="desc-wrap text-center" style="font-family: &quot;Open Sans&quot;, sans-serif;font-size: 12px;">
        <span class="desc desc-1">
          NANOscientific plans are underway to continue the excitement that comes
          from scientific innovation and discovery with a new line up for ${
            year ? `${year} ` : ""
          }
        </span>
        <span class="desc desc-2">
          Stay tuned for the ${
            year ? `${year} ` : ""
          }NANOscientific Event Calendar for your chance to
          network with leading experts who are pioneering the evolution of
          scientific discovery at NANOscientific Conferences Worldwide.
        </span>
      </div>
      <a href="https://event.nanoscientific.org/" target="_blank" style="margin-top: 20px; font-size: 13px">https://event.nanoscientific.org/
    </a></div>
  </body>
  `;
  },
};
