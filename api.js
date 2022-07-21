export const API_END_POINT =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  const res = await fetch(url);
  if (res.ok) {
    const json = await res.json();
    return json;
  }
  throw new Error("API 호출 실패.");
};

export const fetchRoot = async () => request(API_END_POINT);

export const fetchDirectoryByNodeId = async (nodeId) =>
  request(`${API_END_POINT}/${nodeId}`);
