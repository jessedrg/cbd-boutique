import Image from 'next/image'
import Link from 'next/link'
import { type Locale } from '@/lib/seo-lite'
import type { ShopifyProduct } from '@/lib/shopify/types'
import { translateProduct } from '@/lib/translations'

interface ProductGridProps {
  products: ShopifyProduct[]
  locale: Locale
}

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

export async function ProductGrid({ products, locale }: ProductGridProps) {
  const translatedProducts = await Promise.all(
    products.map(async (product) => {
      if (locale === 'en') {
        return {
          ...product,
          translatedTitle: product.title,
          translatedProductType: product.productType || '',
        }
      }

      const translated = await translateProduct(
        {
          id: product.id,
          title: product.title,
          productType: product.productType,
        },
        locale,
        'en'
      )

      return {
        ...product,
        translatedTitle: translated.title,
        translatedProductType: translated.productType,
      }
    })
  )

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {translatedProducts.map((product) => {
        const imageUrl = product.images?.edges?.[0]?.node?.url
        const price = product.priceRange?.minVariantPrice
        const comparePrice = product.compareAtPriceRange?.minVariantPrice
        const hasDiscount = comparePrice && parseFloat(comparePrice.amount) > parseFloat(price?.amount || '0')

        return (
          <Link 
            key={product.id} 
            href={`/${locale}/product/${product.handle}`}
            className="group cursor-pointer"
          >
            {/* Product Image */}
            <div className="aspect-[3/4] bg-secondary mb-2 sm:mb-4 overflow-hidden relative">
              {imageUrl ? (
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={product.translatedTitle}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                  <svg className="h-10 w-10 text-muted-foreground/30" viewBox="0 0 57 57" fill="currentColor">
                    <path d="M40 16.3L32.7 7.4L30.7 4.1L32.3 0L22.6 8.2L29.9 17L31.9 20.3L30.3 24.4L40 16.3Z"/>
                    <path d="M25.9 12.3L14.5 12.5L10.7 12L8.60001 8.2L8.89999 20.9L20.3 20.7L24.1 21.2L26.2 25L25.9 12.3Z"/>
                    <path d="M14 20.9L7.10001 30L4.39999 32.8L0 32.1L10.1 39.7L17 30.6L19.7 27.9L24.1 28.6L14 20.9Z"/>
                  </svg>
                </div>
              )}
              {hasDiscount && (
                <span className="absolute top-3 left-3 bg-foreground text-background text-[10px] uppercase tracking-wider px-3 py-1 font-medium">
                  Sale
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-1.5">
              {product.translatedProductType && (
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-light">
                  {product.translatedProductType}
                </p>
              )}
              <h3 className="text-sm font-light leading-snug group-hover:text-primary transition-colors">
                {product.translatedTitle}
              </h3>
              <div className="flex items-center gap-2">
                {price && (
                  <p className="text-sm font-medium">
                    {formatPrice(price.amount, price.currencyCode)}
                  </p>
                )}
                {hasDiscount && comparePrice && (
                  <p className="text-xs text-muted-foreground line-through">
                    {formatPrice(comparePrice.amount, comparePrice.currencyCode)}
                  </p>
                )}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
