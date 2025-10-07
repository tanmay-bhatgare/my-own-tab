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
  console.log("I NL is mounted")
  const [news, setNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNews = () => {
    if (typeof chrome !== "undefined" && chrome.runtime) {
      setLoading(true);
      chrome.runtime.sendMessage({ action: "fetchNews" }, (response) => {
        try {
          if (response?.success) {
            const rssFeed = parseRSS(response.data);
            setNews(rssFeed.items);
          } else {
            console.error("Failed to fetch news");
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false); // ✅ ensures it always stops loading
        }
      });
    } else {
      console.warn(
        "NL: Chrome API not available — are you running outside extension?"
      );
    }
  };

  useEffect(() => fetchNews(), []);
  return (
    <div className="h-full pb-12">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-28 aspect-square rounded-full border-t-2 border-t-slate-100 animate-spin" />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default NewsList;
