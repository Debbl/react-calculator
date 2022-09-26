import { Icon } from "@iconify-icon/react";
import useDark from "@/hooks/useDark";

function Footer() {
  const [isDark, setIsDark] = useDark();
  return (
    <div className="flex items-center justify-center gap-x-2">
      <button className="flex items-center" onClick={() => setIsDark(!isDark)}>
        {isDark ? <Icon icon="carbon:sun" /> : <Icon icon="carbon:moon" />}
      </button>
      <a
        href="https://github.com/Debbl"
        className="flex items-center"
        target="_blank"
        rel="noreferrer"
      >
        <Icon
          icon="ant-design:github-outlined"
          className="relative hover:text-green-400/50"
        />
      </a>
    </div>
  );
}
export default Footer;
