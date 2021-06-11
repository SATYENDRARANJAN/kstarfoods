from django.db.models import Q

from shop.models import Tags, Products


def getSearchResults(key):
    # find the product with the key in their title
    # find the tags with key in their title and find corresponding products .
    tag= Tags.objects.filter(tag_name__icontains=key)

    products= Products.objects.filter(Q(product_name__icontains=key)| Q(product_slug__icontains=key)|Q(description__icontains=key))

    if tag.exists():
        tagged_products = Products.objects.filter(taglist__tag_name=tag[0])
        # take union of 2 querysets
        products.union(tagged_products)
    return products

