import Mock from "mockjs";
import banner from "./json/banners.json";
import floor from "./json/floors.json";

// 搜索框提示文字
// const { data } = Mock.mock({
//   "data|4": ["@cword(2,4)"],
// });
// Mock.mock("/mock/searchtip", { code: 200, data });

// 轮播图api
Mock.mock("/mock/banner", { code: 200, data: banner });

// 楼层图api
Mock.mock("/mock/floor", { code: 200, data: floor });
