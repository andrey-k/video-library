from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

from views import (TitleListView, TitleCreateView, TitleUpdateView,
                   TitleDeleteView, DeleteMultipleTitles, UpdateRating)

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', TitleListView.as_view(), name="title_list"),
    url(r'^sorted/(?P<sort_by>[\w\+]+)/$', TitleListView.as_view(), 
        name="title_list_sorted"),
    url(r'^titles/add/$', TitleCreateView.as_view(), name="create_title"),
    url(r'^titles/(?P<pk>\d+)/$', TitleUpdateView.as_view(template_name="mydb/title_update_form.html"),
        name="update_title"),
    url(r'^titles/(?P<pk>\d+)/delete/$', TitleDeleteView.as_view(),
        name="delete_title"),
    url(r'^titles/delete_selected/$', DeleteMultipleTitles,
        name="delete_selected"),
    url(r'^titles/update_rating/$', UpdateRating,
        name="update_rating"),
)
