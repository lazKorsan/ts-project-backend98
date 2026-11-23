@Courses
Feature: Bir yönetici olarak API bağlantısı üzerinden courses'e erişebilmek istiyorum.

  @US011TC01_ATIN_get
  Scenario: Pozitive > GET [ADMIN=TRUE],[ID=NONE]
  /api/courses endpoint'ine
  gecerli authorization bilgileri ile
  bir GET request gönderildiginde
  dönen status code'in 200
  ve response body'deki remark bilgisinin "success" oldugu dogrulanmali.
    * Course kullanicisi "admin" token ile baseUrl olusturur
    * Course kullanicisi "api/courses" path parametrelerini olusturur
    * Courses kullanicisi "GET" sorgusu gonderir
    * Courses kullanicisi "remark" bilgisinin "succes" oldugunu dogrular
    * Courses kullanicisi "status" degerinin 200 oldugunu dogrular
    * Courses kullanicisi idList console yazdirir
    * Course kullanicisi "minID" degerini console yazdirir
    * Course kullanicisi "maxID" degerini console yazdirir