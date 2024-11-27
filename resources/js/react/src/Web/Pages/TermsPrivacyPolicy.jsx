import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Card from "../Components/Card";

const TermsPrivacyPolicy = () => {
  return (
    <div className="bg-gradient-to-r from-[#018ba3] to-[#008d49] font-montserrat">
      <Header />
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 md:px-2">
        <Card className={" !rounded-3xl mb-6"}>
          <div className="mx-auto px-6 sm:mt-0 lg:px-12 xl:my-6">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="flex flex-col md:flex-row items-center gap-10 justify-start">
                <h2 className=" text-4xl font-semibold tracking-tight text-black sm:text-2xl">
                  Terms of Service
                </h2>
              </div>

              <div className="lg:w-full lg:max-w-full lg:flex-auto">
                <h2 className="mt-4 text-lg text-black font-semibold">
                  SafeSpace Terms of Service
                </h2>
                <p className="mt-2 max-w-full text-base/7 text-black">
                  Welcome to SafeSpace, a service that verifies e-commerce
                  stores based on a series of security and operational checks.
                  By using our services, you agree to be bound by these Terms of
                  Service ("Terms"). Please read them carefully before using the
                  SafeSpace platform.
                </p>

                <h3 className="mt-6 font-semibold text-lg text-black">
                  1. Acceptance of Terms
                </h3>
                <p className="mt-2 max-w-full text-base/7 text-black">
                  By accessing or using the SafeSpace platform (the "Service"),
                  you, the user (referred to as "you," "your," or the "User"),
                  agree to be bound by these Terms of Service, as well as our
                  Privacy Policy. If you do not agree to all of these terms, do
                  not use the Service.
                </p>

                <h3 className="mt-6 font-semibold text-lg text-black">
                  2. Service Description
                </h3>
                <p className="mt-2 max-w-full text-base/7 text-black">
                  SafeSpace provides a verification service that assesses
                  e-commerce stores based on specific criteria, such as security
                  protocols, business registration, and other factors related to
                  online consumer safety. The verification process is based on
                  the information provided by the e-commerce store and data we
                  are able to access through various third-party APIs and tools.
                </p>

                <h3 className="mt-6 font-semibold text-lg text-black">
                  3. No Endorsement or Guarantee
                </h3>
                <p className="mt-2 max-w-full text-base/7 text-black">
                  While SafeSpace strives to verify stores based on established
                  protocols, we do not endorse, guarantee, or vouch for the
                  reliability, safety, or legitimacy of any e-commerce store
                  using our verification badge. The verification badge indicates
                  that a store has passed certain criteria at the time of
                  evaluation, but it does not guarantee ongoing compliance or
                  the complete safety of transactions conducted with the store.
                </p>

                <h3 className="mt-6 font-semibold text-lg text-black">
                  4. Limitation of Liability
                </h3>
                <p className="mt-2 max-w-full text-base/7 text-black">
                  SafeSpace is not responsible for any actions, inactions,
                  products, services, or policies of the e-commerce stores that
                  have been verified by us. We provide verification services
                  based on certain protocols, but we do not control or monitor
                  the day-to-day operations of any e-commerce store, including
                  product quality, shipping, refund practices, or customer
                  service.
                </p>

                <p className="mt-2 max-w-full text-base/7 text-black">
                  You agree that SafeSpace shall not be held liable for:
                  <ul className="list-disc ml-6 mt-2">
                    <li>
                      Any losses, damages, or claims that arise from your
                      interaction with any e-commerce store using our badge or
                      services.
                    </li>
                    <li>
                      Misleading or false representations made by e-commerce
                      stores regarding products, services, or policies.
                    </li>
                    <li>
                      Any harm or loss resulting from delayed or non-delivery of
                      products purchased through verified stores.
                    </li>
                    <li>
                      Data breaches, identity theft, or any unauthorized use of
                      your data by e-commerce stores.
                    </li>
                  </ul>
                </p>

                <h3 className="mt-6 font-semibold text-lg text-black">
                  5. Third-Party Tools and Data Accuracy
                </h3>
                <p className="mt-2 max-w-full text-base/7 text-black">
                  SafeSpace relies on third-party APIs, databases, and other
                  external tools to gather information about the stores seeking
                  verification. We do our best to use reliable data sources;
                  however, we cannot guarantee the absolute accuracy or
                  completeness of the information we receive from third parties.
                  As a result, SafeSpace is not liable for any inaccuracies in
                  the data used for the verification process.
                </p>

                <h3 className="mt-6 font-semibold text-lg text-black">
                  6. User Responsibility
                </h3>
                <p className="mt-2 max-w-full text-base/7 text-black">
                  As a User of the SafeSpace service, you agree to:
                  <ul className="list-disc ml-6 mt-2">
                    <li>
                      Conduct your own due diligence when interacting with
                      e-commerce stores that display the SafeSpace badge.
                    </li>
                    <li>
                      Exercise caution when providing personal or financial
                      information to online stores.
                    </li>
                    <li>
                      Acknowledge that the SafeSpace verification badge does not
                      equate to an absolute guarantee of safety or legitimacy.
                    </li>
                  </ul>
                </p>
                {/* Terms of Service */}

                <h4 className="mt-6 font-semibold text-lg text-black">
                  7. E-Commerce Store Responsibility
                </h4>
                <p className="mt-2 max-w-full text-base/7 text-black">
                  E-commerce stores verified by SafeSpace are responsible for
                  maintaining compliance with the requirements that led to their
                  verification. SafeSpace reserves the right to revoke
                  verification or display warnings if a store is found to be
                  non-compliant with our standards.
                </p>

                <h4 className="mt-6 font-semibold text-lg text-black">
                  8. Refund and Dispute Policy
                </h4>
                <p className="mt-2 max-w-full text-base/7 text-black">
                  The SafeSpace verification process includes a one-time
                  application fee and an ongoing monthly subscription fee. These
                  fees cover the cost of our verification services but do not
                  guarantee specific results for e-commerce stores. Application
                  fees are non-refundable once the verification process has
                  begun. In the event of a dispute, SafeSpace will review the
                  case but is under no obligation to issue a refund.
                </p>

                <h4 className="mt-6 font-semibold text-lg text-black">
                  9. Trademark and Intellectual Property
                </h4>
                <p className="mt-2 max-w-full text-base/7 text-black">
                  The SafeSpace badge and related materials are the intellectual
                  property of SafeSpace. E-commerce stores are granted limited,
                  non-exclusive use of the SafeSpace badge upon successful
                  verification. Unauthorized use, reproduction, or replication
                  of the SafeSpace badge without permission may result in legal
                  action.
                </p>

                <h4 className="mt-6 font-semibold text-lg text-black">
                  10. Termination of Service
                </h4>
                <p className="mt-2 max-w-full text-base/7 text-black">
                  SafeSpace reserves the right to terminate or suspend access to
                  our service for any reason, without notice, including, but not
                  limited to, breach of these Terms. In the event of
                  termination, e-commerce stores must immediately remove the
                  SafeSpace badge from their websites.
                </p>

                <h4 className="mt-6 font-semibold text-lg text-black">
                  11. Indemnification
                </h4>
                <p className="mt-2 max-w-full text-base/7 text-black">
                  You agree to indemnify, defend, and hold harmless SafeSpace,
                  its affiliates, officers, directors, employees, and agents
                  from and against any and all claims, liabilities, damages,
                  losses, costs, expenses, or fees (including reasonable
                  attorneys' fees) that arise from your use of the Service or
                  any violation of these Terms.
                </p>

                <h4 className="mt-6 font-semibold text-lg text-black">
                  12. Limitation of Legal Recourse
                </h4>
                <p className="mt-2 max-w-full text-base/7 text-black">
                  In no event shall SafeSpace be liable for any indirect,
                  incidental, special, consequential, or punitive damages,
                  including but not limited to, loss of profits, data, use,
                  goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc ml-6 mt-2 text-black">
                  <li>Your use of or inability to use the Service.</li>
                  <li>
                    Unauthorized access, use, or alteration of your
                    transmissions or data.
                  </li>
                  <li>
                    Any conduct or content of any third party, including but not
                    limited to e-commerce stores verified by SafeSpace.
                  </li>
                </ul>

                <h4 className="mt-6 font-semibold text-lg text-black">
                  13. Governing Law
                </h4>
                <p className="mt-2 max-w-full text-base/7 text-black">
                  These Terms and any disputes arising out of or related to them
                  shall be governed by and construed in accordance with the laws
                  of Canada. Any legal action or proceeding relating to your
                  access to or use of the Service will be subject to the
                  exclusive jurisdiction of the courts of Canada.
                </p>

                <h4 className="mt-6 font-semibold text-lg text-black">
                  14. Modifications to Terms
                </h4>
                <p className="mt-2 max-w-full text-base/7 text-black">
                  SafeSpace reserves the right to modify these Terms at any
                  time. Any changes will be effective immediately upon posting
                  on our website. Your continued use of the Service following
                  any such changes constitutes your acceptance of the revised
                  Terms.
                </p>

                <h3 className="mt-6 font-semibold text-lg text-black">
                  15. Contact Information
                </h3>
                <p className="mt-2 max-w-full text-base/7 text-black">
                  If you have any questions or concerns regarding these Terms,
                  please contact us at:
                  <br />
                  <a
                    href="mailto:support@safespacego.com"
                    className="text-blue-500 hover:underline"
                  >
                    support@safespacego.com
                  </a>
                </p>
              </div>
              {/* Privacy Policy */}
            </div>
          </div>
        </Card>

        <Card className={"mt-6 !rounded-3xl mb-6"}>
          <div className="mx-auto px-6 sm:mt-0 lg:px-12 xl:my-6">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="flex flex-col md:flex-row items-center gap-10 justify-start">
                <h2 className=" text-4xl font-semibold tracking-tight text-black sm:text-2xl">
                  Privacy Policy
                </h2>
              </div>
              <p className="mt-2 max-w-full text-base/7 text-black">
                Welcome to SafeSpace. We are committed to protecting your
                privacy and ensuring a secure experience when using our
                services. This Privacy Policy outlines how we collect, use,
                disclose, and safeguard your information when you use our
                services.
              </p>

              <h4 className="mt-6 font-semibold text-lg text-black">
                1. Introduction
              </h4>
              <p className="mt-2 max-w-full text-base/7 text-black">
                Welcome to SafeSpace. We are committed to protecting your
                privacy and ensuring a secure experience when using our
                services. This Privacy Policy outlines how we collect, use,
                disclose, and safeguard your information when you use our
                services.
              </p>

              <h4 className="mt-6 font-semibold text-lg text-black">
                2. Information We Collect
              </h4>
              <h5 className="mt-4 font-semibold text-black">
                2.1 Personal Information
              </h5>
              <p className="mt-2 max-w-full text-base/7 text-black">
                When you apply for verification through SafeSpace, we may
                collect personal information such as:
              </p>
              <ul className="list-disc ml-6 mt-2 text-black">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Business name and contact information</li>
                <li>Payment information</li>
                <li>
                  Other information provided by Shopify and WooCommerce API
                </li>
              </ul>

              <h5 className="mt-4 font-semibold text-black">
                2.2 Technical Data
              </h5>
              <p className="mt-2 max-w-full text-base/7 text-black">
                We may collect technical data automatically when you visit our
                site, including:
              </p>
              <ul className="list-disc ml-6 mt-2 text-black">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring website</li>
                <li>Pages visited and time spent on our site</li>
              </ul>

              <h4 className="mt-6 font-semibold text-lg text-black">
                3. How We Use Your Information
              </h4>
              <p className="mt-2 max-w-full text-base/7 text-black">
                We use your information to:
              </p>
              <ul className="list-disc ml-6 mt-2 text-black">
                <li>
                  Process and manage your application for the SafeSpace badge
                </li>
                <li>Communicate with you regarding your application status</li>
                <li>Improve our services and website functionality</li>
                <li>Process payments and manage billing</li>
                <li>
                  Ensure compliance with our terms of service and legal
                  obligations
                </li>
              </ul>

              <h4 className="mt-6 font-semibold text-lg text-black">
                4. Data Security
              </h4>
              <p className="mt-2 max-w-full text-base/7 text-black">
                We use Google Cloud servers to store and process your data.
                Google Cloud provides robust security measures, including
                encryption, to protect your data both in transit and at rest.
              </p>

              <h4 className="mt-6 font-semibold text-lg text-black">
                5. Data Encryption
              </h4>
              <p className="mt-2 max-w-full text-base/7 text-black">
                <strong>In Transit:</strong> We use SSL/TLS encryption to secure
                data transmitted between your browser and our servers.
                <br />
                <strong>At Rest:</strong> Your data is encrypted and securely
                stored on Google Cloud servers.
              </p>

              <h4 className="mt-6 font-semibold text-lg text-black">
                6. Third-Party Services
              </h4>
              <p className="mt-2 max-w-full text-base/7 text-black">
                We use Shopify to facilitate certain aspects of our service.
                Shopify’s privacy practices are detailed in their Privacy
                Policy. We recommend reviewing their policy to understand how
                they handle your data.
              </p>

              <h4 className="mt-6 font-semibold text-lg text-black">
                7. Data Sharing
              </h4>
              <p className="mt-2 max-w-full text-base/7 text-black">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your data with:
              </p>
              <ul className="list-disc ml-6 mt-2 text-black">
                <li>
                  <strong>Service Providers:</strong> We may share data with
                  third-party service providers who assist us in operating our
                  services, processing payments, and maintaining our website.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your
                  information if required by law or to protect our rights,
                  property, or safety.
                </li>
              </ul>

              <h4 className="mt-6 font-semibold text-lg text-black">
                8. Your Rights
              </h4>
              <p className="mt-2 max-w-full text-base/7 text-black">
                You have the right to:
              </p>
              <ul className="list-disc ml-6 mt-2 text-black">
                <li>Access, correct, or delete your personal information</li>
                <li>Object to the processing of your personal data</li>
                <li>Withdraw consent at any time, where applicable</li>
              </ul>
              <p className="mt-2 max-w-full text-base/7 text-black">
                To exercise these rights, please contact us at{" "}
                <a
                  href="mailto:support@safespacego.com"
                  className="text-blue-600 underline"
                >
                  support@safespacego.com
                </a>
                .
              </p>

              <h4 className="mt-6 font-semibold text-lg text-black">
                9. Cookies and Tracking Technologies
              </h4>
              <p className="mt-2 max-w-full text-base/7 text-black">
                We use cookies and similar technologies to enhance your
                experience on our site. Cookies help us remember your
                preferences and provide personalized content. You can manage
                your cookie preferences through your browser settings.
              </p>

              <h4 className="mt-6 font-semibold text-lg text-black">
                10. Changes to This Privacy Policy
              </h4>
              <p className="mt-2 max-w-full text-base/7 text-black">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated effective date. We
                encourage you to review this policy periodically.
              </p>

              <h4 className="mt-6 font-semibold text-lg text-black">
                11. Contact Us
              </h4>
              <p className="mt-2 max-w-full text-base/7 text-black">
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please contact us at: <br />
                <a
                  href="mailto:support@safespacego.com"
                  className="text-blue-500 hover:underline"
                >
                  support@safespacego.com
                </a>
              </p>
            </div>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default TermsPrivacyPolicy;
