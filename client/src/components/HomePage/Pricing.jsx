import React from "react";
import Slider from "react-slick";
import { FaCircleCheck } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Pricing = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1536, // 2xl breakpoint
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true
                }
            },
            {
                breakpoint: 1280, // xl breakpoint
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ]
    };

    return (
        <section className="relative z-10 bg-gray-50 overflow-hidden pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
            <div className="container w-[90%] mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                            <span className="mb-2 block text-base lg:text-lg font-semibold text-primary">
                                Pricing Table
                            </span>
                            <h2 className="mb-3 text-2xl font-bold leading-[1.208] text-dark dark:text-white sm:text-3xl md:text-4xl">
                                Our Pricing Plan
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="px-4 lg:px-10 xl:px-20">
                    <Slider {...settings} className="pricing-slider">
                        <PricingCard
                            type="Basic"
                            price="$59"
                            subscription="year"
                            buttonText="Buy Now"
                        >
                            <List>Meeting <span className="text-gray-500 text-sm">up to 30 hour per meeting</span></List>
                            <List>Up to 100 attendees <span className="text-gray-500 text-sm">per meeting </span></List>
                            <List>Cloud Storage <span className="text-gray-500 text-sm">5GB </span></List>
                            <List>With GPT-3.5 Companion <span className="text-gray-500 text-sm">for live chat and host </span></List>
                            <List>Clip basic<span className="text-gray-500 text-sm"> can be edited and download </span></List>
                        </PricingCard>
                        <PricingCard
                            type="Professional"
                            price="$199"
                            subscription="year"
                            buttonText="Buy Now"
                            active
                        >
                            <List>Meeting <span className="text-gray-500 text-sm">up to 30 hour per meeting</span></List>
                            <List>Up to 100 attendees <span className="text-gray-500 text-sm">per meeting </span></List>
                            <List>Cloud Storage <span className="text-gray-500 text-sm">10GB </span></List>
                            <List>With GPT-4 Companion <span className="text-gray-500 text-sm">for live chat and host </span></List>
                            <List>Clip Plus and meeting notes <span className="text-gray-500 text-sm">can be edited and download </span></List>
                        </PricingCard>
                        <PricingCard
                            type="Business"
                            price="$249"
                            subscription="year"
                            buttonText="Buy Now"
                        >
                            <List>Meeting <span className="text-gray-500 text-sm">up to 30 hour per meeting</span></List>
                            <List>Up to 100 attendees <span className="text-gray-500 text-sm">per meeting </span></List>
                            <List>Cloud Storage <span className="text-gray-500 text-sm">unlimited </span></List>
                            <List>With GPT-4 Companion <span className="text-gray-500 text-sm">for live chat and host </span></List>
                            <List>Clip Plus and meeting notes<span className="text-gray-500 text-sm"> can be edited and download </span></List>
                        </PricingCard>
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Pricing;

const PricingCard = ({
    children,
    description,
    price,
    type,
    subscription,
    buttonText,
    active,
}) => {
    return (
        <div className="px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="relative z-10 overflow-hidden rounded-[10px] border-2 border-stroke bg-white px-4 py-6 shadow-pricing dark:border-dark-3 dark:bg-dark-2 sm:p-6 lg:p-8 xl:px-10 xl:py-6">
                <span className="mb-2 block text-base lg:text-base font-semibold text-black">
                    {type}
                </span>
                <h2 className="mb-3 text-3xl lg:text-3xl font-bold text-[#1657FF]">
                    {price}
                    <span className="text-sm lg:text-sm font-medium text-body-color dark:text-dark-6 text-black">
                        / {subscription}
                    </span>
                </h2>
                <p className="mb-6 border-b border-stroke pb-6 text-sm text-body-color dark:border-dark-3 dark:text-dark-6">
                    {description}
                </p>
                <div className="mb-6 flex flex-col gap-[10px]">{children}</div>
                <a
                    className={` ${active
                        ? "block w-full rounded-md border border-black bg-black p-2.5 text-center text-sm font-medium text-white transition hover:bg-opacity-90"
                        : "block w-full rounded-md border border-stroke bg-transparent p-2.5 text-center text-sm font-medium text-gray-500 transition hover:border-black hover:bg-black hover:text-white dark:border-dark-3"
                        } `}
                >
                    {buttonText}
                </a>
                <div>
                    <span className="absolute right-0 top-7 z-[-1]">
                        <svg
                            width={77}
                            height={172}
                            viewBox="0 0 77 172"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx={86} cy={86} r={86} fill="url(#paint0_linear)" />
                            <defs>
                                <linearGradient
                                    id="paint0_linear"
                                    x1={86}
                                    y1={0}
                                    x2={86}
                                    y2={172}
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#3056D3" stopOpacity="0.09" />
                                    <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                    <span className="absolute right-4 top-4 z-[-1]">
                        <svg
                            width={41}
                            height={89}
                            viewBox="0 0 41 89"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="38.9138"
                                cy="87.4849"
                                r="1.42021"
                                transform="rotate(180 38.9138 87.4849)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="38.9138"
                                cy="74.9871"
                                r="1.42021"
                                transform="rotate(180 38.9138 74.9871)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="38.9138"
                                cy="62.4892"
                                r="1.42021"
                                transform="rotate(180 38.9138 62.4892)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="38.9138"
                                cy="38.3457"
                                r="1.42021"
                                transform="rotate(180 38.9138 38.3457)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="38.9138"
                                cy="13.634"
                                r="1.42021"
                                transform="rotate(180 38.9138 13.634)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="38.9138"
                                cy="50.2754"
                                r="1.42021"
                                transform="rotate(180 38.9138 50.2754)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="38.9138"
                                cy="26.1319"
                                r="1.42021"
                                transform="rotate(180 38.9138 26.1319)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="38.9138"
                                cy="1.42021"
                                r="1.42021"
                                transform="rotate(180 38.9138 1.42021)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="26.4157"
                                cy="87.4849"
                                r="1.42021"
                                transform="rotate(180 26.4157 87.4849)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="26.4157"
                                cy="74.9871"
                                r="1.42021"
                                transform="rotate(180 26.4157 74.9871)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="26.4157"
                                cy="62.4892"
                                r="1.42021"
                                transform="rotate(180 26.4157 62.4892)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="26.4157"
                                cy="38.3457"
                                r="1.42021"
                                transform="rotate(180 26.4157 38.3457)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="26.4157"
                                cy="13.634"
                                r="1.42021"
                                transform="rotate(180 26.4157 13.634)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="26.4157"
                                cy="50.2754"
                                r="1.42021"
                                transform="rotate(180 26.4157 50.2754)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="26.4157"
                                cy="26.1319"
                                r="1.42021"
                                transform="rotate(180 26.4157 26.1319)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="26.4157"
                                cy="1.4202"
                                r="1.42021"
                                transform="rotate(180 26.4157 1.4202)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="13.9177"
                                cy="87.4849"
                                r="1.42021"
                                transform="rotate(180 13.9177 87.4849)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="13.9177"
                                cy="74.9871"
                                r="1.42021"
                                transform="rotate(180 13.9177 74.9871)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="13.9177"
                                cy="62.4892"
                                r="1.42021"
                                transform="rotate(180 13.9177 62.4892)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="13.9177"
                                cy="38.3457"
                                r="1.42021"
                                transform="rotate(180 13.9177 38.3457)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="13.9177"
                                cy="13.634"
                                r="1.42021"
                                transform="rotate(180 13.9177 13.634)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="13.9177"
                                cy="50.2754"
                                r="1.42021"
                                transform="rotate(180 13.9177 50.2754)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="13.9177"
                                cy="26.1319"
                                r="1.42021"
                                transform="rotate(180 13.9177 26.1319)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="13.9177"
                                cy="1.42019"
                                r="1.42021"
                                transform="rotate(180 13.9177 1.42019)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="1.41963"
                                cy="87.4849"
                                r="1.42021"
                                transform="rotate(180 1.41963 87.4849)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="1.41963"
                                cy="74.9871"
                                r="1.42021"
                                transform="rotate(180 1.41963 74.9871)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="1.41963"
                                cy="62.4892"
                                r="1.42021"
                                transform="rotate(180 1.41963 62.4892)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="1.41963"
                                cy="38.3457"
                                r="1.42021"
                                transform="rotate(180 1.41963 38.3457)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="1.41963"
                                cy="13.634"
                                r="1.42021"
                                transform="rotate(180 1.41963 13.634)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="1.41963"
                                cy="50.2754"
                                r="1.42021"
                                transform="rotate(180 1.41963 50.2754)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="1.41963"
                                cy="26.1319"
                                r="1.42021"
                                transform="rotate(180 1.41963 26.1319)"
                                fill="#3056D3"
                            />
                            <circle
                                cx="1.41963"
                                cy="1.4202"
                                r="1.42021"
                                transform="rotate(180 1.41963 1.4202)"
                                fill="#3056D3"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
};

const List = ({ children }) => {
    return (
        <div className="flex items-start">
            <FaCircleCheck className="text-[#1657FF] flex-shrink-0 mt-1 text-sm lg:text-base" />
            <p className="text-sm lg:text-base text-black font-semibold ml-2">{children}</p>
        </div>
    );
};

