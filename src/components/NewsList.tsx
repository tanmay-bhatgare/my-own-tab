import { useEffect, useState } from "react";

type NewsType = {
  description: string;
  link: string;
  title: string;
};
const parseRSS = (xmlString: string) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, "text/xml");

  const items = Array.from(xml.querySelectorAll("item")).map((item) => ({
    title: item.querySelector("title")?.textContent ?? "No title",
    link: item.querySelector("link")?.textContent ?? "#",
    description: item.querySelector("description")?.textContent ?? "",
  }));

  return {
    title: xml.querySelector("channel > title")?.textContent ?? "RSS Feed",
    items,
  };
};

const NewsList = () => {
  const [news, setNews] = useState<NewsType[]>([]);
  const fetchNews = () => {
    if (typeof chrome !== "undefined" && chrome.runtime) {
      try {
        chrome.runtime.sendMessage(
          { action: "fetchNews" },
          async (response) => {
            if (response.success) {
              const rssFeed = parseRSS(response.data);
              setNews(rssFeed.items);
            } else {
              console.log("Chud gaye guru🙆‍♂️");
            }
          }
        );
      } catch (e) {
        console.error(e);
      }
    } else {
      console.warn(
        "NL: Chrome API not available — are you running outside extension?"
      );
    }
  };

  useEffect(() => fetchNews(), []);
  return (
    <div className="h-full pb-12">
      <div className="h-full p-2 space-y-2 overflow-y-auto scroll-smooth">
        {news.map((item, index) => (
          <div
            key={index}
            className="bg-background-light flex flex-col px-1.5 py-2"
          >
            <p className="selectable text-xl font-semibold">{item.title}</p>
            <p className="selectable text-lg italic">- {item.description}</p>
            <a
              className="underline self-end pt-2"
              href={item.link}
              target="_blank"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
