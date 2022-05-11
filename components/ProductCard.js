import Link from 'next/link'
import Image from 'next/link'

export const ProductCard = ( { product }) => {

    const { handle, title, description } = product.node
    const { altText, url } = product.node.images.edges[0].node
  return (
    <Link
        href={`/products/${handle}`}
    >
        <a className='group'>
            <div className='w-full bg-gray-200 rounded-3xl overflow-hidden'>
                <div className='relative group-hover:opacity-75 h-72'>
                    <Image
                        src={url}
                        alt={altText}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div>
        </a>
    </Link>
  )
}