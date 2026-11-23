@Courses
Feature: Bir yönetici olarak API bağlantısı üzerinden courses'e erişebilmek istiyorum.

  @US001TC02_ATID_get
  Scenario: Pozitive -> get,GET [ADMIN=TRUE],[ID=DYNAMIC]
  id(x) olaninin
  response body'de donen bilgileri (teacher_id, creator_id, category_id, type, private, slug, start_date, duration, timezone) doğrulanmalı.
    * Course kullanicisi "admin" token ile baseUrl olusturur
    * Course kullanicisi "api/courses" path parametrelerini olusturur
    * Courses kullanicisi "GET" sorgusu gonderir
    * Courses kullanicisi "remark" bilgisinin "succes" oldugunu dogrular
    * Courses kullanicisi "status" degerinin 200 oldugunu dogrular
    * Course kullanicisi "minID" degerini console yazdirir
    * Course kullanicisi "api/course/minID" path parametrelerini olusturur
    * Courses kullanicisi "GET" sorgusu gonderir
    * Courses kullanicisi "remark" bilgisinin "succes" oldugunu dogrular
    * Courses kullanicisi "status" degerinin 200 oldugunu dogrular

