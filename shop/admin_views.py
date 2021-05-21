from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import render
import openpyxl
from rest_framework.permissions import AllowAny

from shop.models import Products, Tags, Category, SubCategory


@api_view(['GET','POST'])
@permission_classes([AllowAny,])
def productUpload(request):
    if "GET" == request.method:
        return render(request, 'product_upload.html', {})
    else:
        excel_file = request.FILES["excel_file"]

        # you may put validations here to check extension or file size
        wb = openpyxl.load_workbook(excel_file)

        # getting a particular sheet by name out of many sheets
        worksheet = wb["Sheet1"]
        print(worksheet)
        not_added_list =[]
        excel_data = list()
        # iterating over the rows and
        # getting value from each cell in row
        for row in worksheet.iter_rows():
            if row[0].value == 'product_name' :
                continue
            if row[0].value == 'ENDLIST--------@CHERIE -DO NOT DELETE THIS':
                break
            row_data = list()
            for cell in row:
                row_data.append(str(cell.value))
            excel_data.append(row_data)
            product_obj = Products.objects.filter(Q(product_slug=row_data[1]) | Q(product_name=row_data[0]))
            if product_obj.exists():
                not_added_list.append(row_data)
                continue
            product_obj = Products.objects.create(
                product_name = row_data[0],
                product_slug = row_data[1] ,
                img = row_data[2],
                heading = row_data[3] ,
                subtxt = row_data[4],
                category = Category.objects.get(id=int(row_data[5])) ,
                subcategory = SubCategory.objects.get(id=int(row_data[6])),
                short_code = row_data[7] ,
                care_info = row_data[8],
                description = row_data[9],
                price = row_data[10],
                is_active = row_data[11],
            )
            tag_list = row_data[12].strip().split(",")
            for id in tag_list:
                product_obj.taglist.add(Tags.objects.get(id =id))
                product_obj.save()


        return render(request, 'product_upload.html', {"excel_data": excel_data,'product_not_added':not_added_list})