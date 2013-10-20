from django.test import TestCase
from django.core.urlresolvers import reverse
from .models import Title

class AddMovieTestCase(TestCase):
    
    def test_adding_movie(self):
        data = {'name': 'Terminator 2: Judgment Day', 'director': 'James Cameron', 'rating': 9 }

        response = self.client.post(reverse("create_title"),
                                    data)
        self.assertFormError(response, "form", "year",
                             "This field is required.")
        data.update({ 'year': 1991 })
        response = self.client.post(reverse("create_title"), data)
        titles = Title.objects.all().order_by('-id')
        self.assertGreater(len(titles), 0,
                           msg="Title should have been created")
        # self.assertRedirects(response, reverse("update_title",
        #                                        args=(titles[0].pk,)),
        #                      msg_prefix="Success should redirect to edit page")
        self.assertRedirects(response, reverse("title_list",
                                                 args=()),
                             msg_prefix="Success should redirect to list page")
