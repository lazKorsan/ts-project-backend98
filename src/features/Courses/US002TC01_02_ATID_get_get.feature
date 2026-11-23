@Courses
Feature: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip course'in detaylı bilgilerine erisebilmeliyim.

  @US002TC01_ATID_get_get
  Scenario: Pozitive -> get,GET [ADMIN=TRUE],[ID=DYNAMIC]
  /api/course/{id} endpoint'ine
  gecerli authorization bilgileri ve
  dogru data (id) iceren
  bir GET request gönderildiginde
  dönen status code'in 200
  ve response body'deki remark bilgisinin "success" oldugu dogrulanmali.
    * Course kullanicisi "admin" token ile baseUrl olusturur
    * Course kullanicisi "api/courses" path parametrelerini olusturur
    * Courses kullanicisi "GET" sorgusu gonderir
    * Courses kullanicisi "remark" bilgisinin "success" oldugunu dogrular
    * Courses kullanicisi "status" degerinin 200 oldugunu dogrular
    * Course kullanicisi "minID" degerini console yazdirir
    * Course kullanicisi "api/course/minID" path parametrelerini olusturur
    * Courses kullanicisi "GET" sorgusu gonderir
    * Courses kullanicisi "remark" bilgisinin "success" oldugunu dogrular
    * Courses kullanicisi "data.type" bilgisinin "webinar" oldugunu dogrular
    * Courses kullanicisi "status" degerinin 200 oldugunu dogrular
    * Courses kullanicisi "data.id" degerinin 1998 oldugunu dogrular