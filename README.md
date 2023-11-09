## Semantic search with using vectors (alpha)

Semantic search seeks to improve search accuracy by understanding the content of the search query. In contrast to traditional search engines which only find based on lexical matches, semantic search can also find synonyms.

This is example without using pre-trained / trained model

For small corpora (up to about 1 million entries) we can compute the cosine-similarity between the query and all entries in the corpus. `findHotelsByQuery` vs `findHotelsByQueryQuick`