import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import stack1 from "../../assets/Images/stack1.png";
import Badge from "../../assets/Images/Badge.png";
import customer from "../../assets/Images/customer.png";
import online from "../../assets/Images/online.png";
import productt from "../../assets/Images/productt.png";
import tel from "../../assets/Images/tel.png";
import ssl from "../../assets/Images/ssl.png";
import re from "../../assets/Images/re.png";
import Card from "../Components/Card";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
const SafeSpaceStack = () => {
  const product = {
    details: [
      {
        name: "How do we validate merchant compliance?",
        items: [
          "SafeSpace utilizes internal & external API's to analyze business data and verify legitimacy amoung our merchants",
        ],
      },
      {
        name: "How do I integrate SafeSpace into my E-commerce business?",
        items: [
          "SafeSpace is availble on our partnered platforms, Shopify, Woocommerce, & Bigcommerce.",
        ],
      },
      {
        name: "As a merchant am forced to display all my store statistics?",
        items: [
          "Merchants have the option to hide their store's number of orders and hide their stores phone number if they only offer customer service via email. The rest of the visible store statistics are required to be shown",
        ],
      },
      {
        name: "What is the cost of using SafeSpace services?",
        items: [
          "Due to the in depth verification process SafeSpace charges a non-refundable fee of $199.00 USD for application processing, as well as a $29.99 USD/month subscription to maintain usage",
        ],
      },
    ],
  };
  return (
    <div className="bg-gradient-to-r from-[#018ba3] to-[#008d49]">
      <Header />
      <div className="w-full max-w-[1540px] mx-auto  px-4 sm:px-6 md:px-2">
        <Card className={"mt-6   !rounded-3xl  "}>
          <div className=" mx-auto  px-6 sm:mt-0  lg:px-8 xl:my-6 ">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="flex flex-col md:flex-row  items-center gap-10 justify-between ">
                <h2 className="text-pretty text-4xl font-semibold tracking-tight text-black sm:text-2xl">
                  The SafeSpace stack - Why it works.
                </h2>
                <div className="flex-wrap">
                  <img src={stack1} alt="" className="w-full" />
                </div>
              </div>

              <div className="lg:w-full lg:max-w-full lg:flex-auto">
                <p className="mt-10 max-w-full text-base/7 text-black">
                  The SafeSpace Stack bridges the trust gap between independent
                  e-commerce stores and retail giants like Amazon by giving
                  smaller merchants the credibility needed to compete on the
                  same playing field. The stack assures customers that the store
                  has passed rigorous verification for website security, payment
                  processing, and business legitimacy, fostering confidence in
                  shopping with smaller, individual businesses. In addition to
                  secure transactions, SafeSpace promotes transparency by
                  verifying that products are shipped promptly and reliably,
                  ensuring customers receive their orders as expected. The
                  SafeSpace Stack features a comprehensive merchant profile,
                  displaying transaction histories, performance metrics, and
                  security ratings, all backed by robust server-side
                  verification to ensure data accuracy. This combination of
                  trust, security, and shipping transparency helps independent
                  stores build long-term relationships with their customers,
                  much like major platforms.
                </p>
              </div>
            </div>
          </div>
        </Card>
        <Card className={"mt-6   !rounded-3xl"}>
          <div className="mx-auto  px-6 sm:mt-0 lg:px-8 xl:my-6">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                Badge
              </h2>
              <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                  <p className=" max-w-xl text-base/7 text-black">
                    The SafeSpace badge boosts customer trust and confidence in
                    online shopping by assuring shoppers that they are engaging
                    with merchants who have undergone rigorous tests for safety
                    and reliability. It combines advanced technology and
                    server-side verification to uphold strict security standards
                    while safeguarding its integrity through restricted
                    right-click JavaScript, dynamic CSS, and interactive
                    integration. Customers can easily access detailed merchant
                    profiles, including transaction histories and security
                    ratings through the badge, empowering them to make informed
                    decisions. This fosters loyalty and emphasizes a commitment
                    to customer safety, enhancing the overall shopping
                    experience.
                  </p>
                </div>
                <div className="flex justify-center lg:flex lg:flex-auto lg:justify-center ">
                  <img src={Badge} alt="" className="" />
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card className={"mt-6   !rounded-3xl"}>
          <div className="mx-auto   px-6 sm:mt-0 lg:px-8 xl:my-6">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                <div className="flex justify-center lg:flex lg:flex-auto lg:justify-center">
                  <img src={customer} alt="" className="" />
                </div>

                <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                  <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                    Customer Prompted Pop Up
                  </h2>
                  <p className=" max-w-xl text-base/7 text-black mt-3">
                    The SafeSpace verified popup is activated when shoppers
                    click on the badge, providing them with essential
                    information at a glance. It features median delivery times,
                    customer service contact details, and summaries of return
                    policies, all verified for transparency. Additionally, we
                    highlight the security checks that merchants have
                    successfully passed, displaying this information
                    prominently. The popup also includes a link to the
                    merchant's profile on the SafeSpace website, allowing
                    customers to explore further details
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card className={"mt-6  !rounded-3xl"}>
          <div className="mx-auto   px-6 sm:mt-0 lg:px-8 xl:my-6">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                Online Merchant Profile + Store Redirect
              </h2>
              <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                  <p className=" max-w-xl text-base/7 text-black">
                    The SafeSpace online profile offers a detailed overview of a
                    merchant's performance and reliability. It includes the
                    merchant's overall credibility check, total number of orders
                    processed, refund rate, median delivery time. and an overall
                    safety rating. Additionally, we provide customer service
                    contact information and a summary of the return policy for
                    transparency. To enhance the shopping experience, the
                    profile features a button that allows shoppers to quickly
                    return to the previous page and continue browsing the
                    merchant's store
                  </p>
                </div>
                <div className="flex justify-center  lg:flex lg:flex-auto lg:justify-center">
                  <img src={online} alt="" className="" />
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card className={"mt-6  !rounded-3xl "}>
          <div className=" mx-auto   px-6 sm:mt-0 lg:px-8 xl:my-6">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-pretty text-4xl font-semibold tracking-tight text-black sm:text-2xl">
                A Deep Dive into the Verification process
              </h2>

              <div className="lg:w-full lg:max-w-full lg:flex-auto">
                <p className="mt-10 max-w-full text-base/7 text-black">
                  At SafeSpace, trust is at the core of what we do. Our
                  comprehensive verification process is meticulously designed to
                  ensure that every SafeSpace-compliant merchant meets the
                  highest standards of legitimacy and security. Each step aims
                  to protect consumers and foster confidence in online
                  transactions. In this overview, we'll walk you through the key
                  protocols we follow to authenticate businesses, highlighting
                  the significance of each measure in building trust and
                  ensuring a sate, dependable shopping experience for all.
                </p>
              </div>
            </div>
          </div>
          <div className="mx-auto   px-6 sm:mt-0 lg:px-8 xl:my-6">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-xl">
                Product Delivery Verification:
              </h2>
              <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                  <p className=" max-w-xl text-base/7 text-black">
                    SafeSpace strengthens customer trust by thoroughly verifying
                    a random sample of a merchant's past deliveries. We
                    meticulously check tracking numbers and shipment
                    confirmations to confirm reliable product delivery while
                    identifying any fake orders. Additionally, we provide
                    transparency by displaying the merchant's median delivery
                    time derived from this sample. By reviewing both delivery
                    times and successful delivery rates, we enable merchants to
                    pass this portion of the verification protocol. This process
                    addresses a common customer concern whether they will
                    actually receive their orders offering crucial assurance
                    that SafeSpace-compliant merchants are trustworthy and
                    dependable.
                  </p>
                </div>
                <div className="flex justify-center mb-4 lg:flex lg:flex-auto lg:justify-center">
                  <img src={productt} alt="" className="" />
                </div>
              </div>
            </div>
          </div>
          <div className=" mx-auto   px-6 sm:mt-0 lg:px-8 xl:my-6">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-pretty text-4xl font-semibold tracking-tight text-black sm:text-xl">
                Secure Payment Gateways:
              </h2>

              <div className="lg:w-full lg:max-w-full lg:flex-auto">
                <p className="mt-10 max-w-full text-base/7 text-black">
                  All SafeSpace-verified merchants are required to use secure,
                  PCI DSS-compliant payment gateways, ensuring the secure
                  processing of customers' payment data in line with industry
                  best practices. We verify trusted gateways like Stripe and
                  PayPal, granting merchants a pass in this part of the protocol
                  only after confirming compliance. Payment security is a top
                  priority for online shoppers a secure payment gateway not only
                  safeguards sensitive information but also demonstrates the
                  merchant's commitment to financial safety, thereby building
                  trust and reducing checkout friction.
                </p>
              </div>
            </div>
          </div>
          <div className="mx-auto   px-6 sm:mt-0 lg:px-8 xl:my-6">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-xl">
                Customer Service Contact Information:
              </h2>
              <div className="mt-6 flex flex-col gap-x-8 gap-y-20  lg:flex-row">
                <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                  <p className=" max-w-xl text-base/7 text-black">
                    To further enhance trust, SafeSpace mandates that all
                    merchants provide valid and accessible contact information
                    for customer service inquiries, including phone numbers,
                    email addresses, and, in some cases, live chat support. We
                    test these channels to confirm their reliability. Only after
                    verifying responsiveness can merchants pass this section of
                    the protocol This step is crucial because trust is built
                    when customers know they can easily reach a business for
                    assistance, Responsive customer service minimizes hesitation
                    during the purchasing process, while a lack of accessible
                    support often raises red flags for shoppers, potentially
                    leading to cart abandonment.
                  </p>
                </div>
                <div className=" flex justify-center mb-6  lg:flex lg:flex-auto lg:justify-center">
                  <img src={tel} alt="" className="" />
                </div>
              </div>
            </div>
          </div>
          <div className=" mx-auto   px-6 sm:mt-0 lg:px-8 xl:my-6">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-pretty text-4xl font-semibold tracking-tight text-black sm:text-xl">
                Business Registration Verification:
              </h2>

              <div className="lg:w-full lg:max-w-full lg:flex-auto">
                <p className="mt-10 max-w-full text-base/7 text-black">
                  To confirm the legitimacy of each business, SafeSpace verifies
                  that merchants are properly registered with their respective
                  local or national authorities by requiring valid business
                  licenses, tax documents, or other official registrations.
                  Merchants can only pass this section of the protocol after
                  successfully completing this verification. This process is
                  essential for preventing fraudulent or fly-by-night
                  operations, as customers want to know they are dealing with a
                  legitimate, accountable business. SafeSpace's business
                  registration checks help foster trust by ensuring that each
                  merchant is a real, traceable entity.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto   px-6 sm:mt-0 lg:px-8 xl:my-6">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-xl">
                SSL/TLS Encryption:
              </h2>
              <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                  <p className=" max-w-xl text-base/7 text-black">
                    To protect customer data during transactions, every
                    SafeSpace- compliant store must have SSL/TLS encryption
                    enabled. We verify that the website uses HTTPS to secure all
                    communication between the site and its visitors. Only after
                    confirming the implementation of SSL/TLS encryption can
                    merchants pass this section of the protocol. This encryption
                    is vital for securing customer data, ensuring privacy, and
                    preventing data breaches, as online shoppers are more likely
                    to abandon a purchase if they feel their personal or payment
                    information is at risk. By enforcing SSL/TLS protocols,
                    SafeSpace helps build customer trust in the security of
                    their online transactions.
                  </p>
                </div>
                <div className=" flex justify-center mb-4 lg:flex lg:flex-auto lg:justify-center">
                  <img src={ssl} alt="" className="" />
                </div>
              </div>
            </div>
          </div>
          <div className=" mx-auto   px-6 sm:mt-0 lg:px-8 xl:my-6">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-pretty text-4xl font-semibold tracking-tight text-black sm:text-xl">
                Domain Registration:
              </h2>

              <div className="lg:w-full lg:max-w-full lg:flex-auto">
                <p className="mt-10 max-w-full text-base/7 text-black">
                  A key aspect of our verification process is ensuring that the
                  domain registration information is accurate and transparent.
                  We verify that the store's domain is registered with a
                  reputable registrar, such as GoDaddy, Namecheap, or Google
                  Domains, and has been registered for more than one year.
                  Additionally, we examine the domain for signs of recent or
                  frequent changes and verify if DNS/DNSSEC is enabled.
                  Merchants can proceed through this section of the protocol
                  only after passing these criteria. This thorough approach
                  reduces the risk of fraudulent activity and reassures
                  customers that the business is stable and reliable.
                </p>
              </div>
            </div>
          </div>
          <div className=" mx-auto   px-6 sm:mt-0 lg:px-8 xl:my-6">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-pretty text-4xl font-semibold tracking-tight text-black sm:text-xl">
                Return Policy & Refund Rates:
              </h2>

              <div className="lg:w-full lg:max-w-full lg:flex-auto">
                <p className="mt-10 max-w-full text-base/7 text-black">
                  Finally, we require merchants to have a clear, fair, and
                  easily accessible return policy that outlines specific
                  guidelines for returning items, applicable conditions, and
                  refund processing. SafeSpace reviews these policies to ensure
                  they align with best practices and are consumer-friendly. We
                  also calculate and publicly disclose refund rates for each
                  merchant, providing transparency and helping customers make
                  Informed decisions. Only after passing this review can
                  merchants proceed through this section of the protocol. A
                  clear return policy is essential for reducing shopper anxiety,
                  especially when purchasing from new or unfamiliar stores,
                  shoppers are more likely to complete a purchase if they know
                  they can easily return a product if needed. By enforcing
                  transparent return policies, SafeSpace helps merchants
                  increase conversions and enhance customer satisfaction.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:flex lg:flex-auto lg:justify-center mt-4">
            <img src={re} alt="" className="" />
          </div>
        </Card>
        <Card className={"mt-6  !rounded-3xl mb-6"}>
          <div className=" mx-auto   px-6 sm:mt-0 lg:px-8 xl:my-6">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-pretty text-4xl font-semibold tracking-tight text-black sm:text-xl">
                Frequently asked questions
              </h2>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  {product.details.map((detail) => (
                    <Disclosure key={detail.name} as="div">
                      <h3>
                        <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                          <span className="text-sm font-medium text-black group-data-[open]:text-black">
                            {detail.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="block h-6 w-6 text-gray-400 group-hover:text-gray-500 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="hidden h-6 w-6 text-indigo-400 group-hover:text-indigo-500 group-data-[open]:block"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className=" text-sm pb-6 ">
                        <ul role="list">
                          {detail.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default SafeSpaceStack;
