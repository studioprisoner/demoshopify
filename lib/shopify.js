const domain = process.env.NEXT_PUBLIC_API_URL
const storefrontAccessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN

async function ShopifyData(query) {
    const URL = domain

    const options = {
        endpoint: URL,
        method: "POST",
        headers: {
          "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query })
      }

      try {
        const data = await fetch(URL, options).then(response => {
          return response.json()
        })
    
        return data
      } catch (error) {
        throw new Error("Products not fetched")
      }
}

const gql = String.raw

export async function getProductsInCollection() {
    const query = gql`
    {
            collection(handle: "frontpage") {
            title
            products(first: 25) {
            edges {
                node {
                id
                title
                handle
                description
                images(first: 5) {
                    edges {
                    node {
                        url
                        altText
                    }
                    }
                }
                }
            }
            }
        }
    }`

    const response = await ShopifyData(query)

    const allProducts = response.data.collection.products.edges ? response.data.collection.products.edges : []

    return allProducts
}