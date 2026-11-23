Feature:
Scenario: Yeni Kurs Olusturma ve Guncelleme Akisi
Given Course kullanicisi "admin" token ile baseUrl olusturur
And Course kullanicisi "api/courses" path parametrelerini olusturur
When Course kullanicisi asagidaki bilgilerle "POST" sorgusu gonderir
| title       | TypeScript API Otomasyonu |
| price       | 150                       |
| category_id | 5                         |
Then Courses kullanicisi "status" bilgisinin "success" oldugunu dogrular

  # Silme işlemi için aynı step yapısı:
And Course kullanicisi "api/course/minID" path parametrelerini olusturur
When Courses kullanicisi "DELETE" sorgusu gonderir
Then Courses kullanicisi "remark" bilgisinin "success" oldugunu dogrular