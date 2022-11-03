 export const fetchImage = (wordSearch, page, key, per_page) => {
  return fetch(
    `https://pixabay.com/api/?q=${wordSearch}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(`There are no pictures on demand ${wordSearch}`)
    );
  });
}