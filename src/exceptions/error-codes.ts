export enum ErrorCodes {
  //User
  USER_NOT_FOUND = 1011,
  USER_NOT_DELETED = 1012,
  USER_NOT_UPDATED = 1013,
  USER_CREATION_FAILED = 1014,
  //UserRole
  USER_ROLE_NOT_FOUND = 2011,
  USER_ROLE_NOT_DELETED = 2012,
  USER_ROLE_NOT_UPDATED = 2013,
  USER_ROLE_CREATION_FAILED = 2014,
  //UserRestaurant
  USER_RESTAURANT_NOT_FOUND = 3011,
  USER_RESTAURANT_NOT_DELETED = 3012,
  USER_RESTAURANT_NOT_UPDATED = 3013,
  USER_RESTAURANT_CREATION_FAILED = 3014,
  //Role
  ROLE_NOT_FOUND = 4011,
  ROLE_NOT_DELETED = 4012,
  ROLE_NOT_UPDATED = 4013,
  ROLE_CREATION_FAILED = 4014,
  //Restaurant
  RESTAURANT_NOT_FOUND = 5011,
  RESTAURANT_NOT_DELETED = 5012,
  RESTAURANT_NOT_UPDATED = 5013,
  RESTAURANT_CREATION_FAILED = 5014,
  //Reservation
  RESERVATION_NOT_FOUND = 6011,
  RESERVATION_NOT_DELETED = 6012,
  RESERVATION_NOT_UPDATED = 6013,
  RESERVATION_NOT_CREATED = 6014,
  //Auth
  AUTH_NOT_FOUND = 7011,
  AUTH_NOT_DELETED = 7012,
  AUTH_NOT_UPDATED = 7013,
  AUTH_NOT_CREATED = 7014,
  //Unauthorized
  AUTHORIZATION_FAILD = 8011,
  //Extra
  UNAUTHORIZED_ACCESS = 1015,
  FORBIDDEN = 1016,
  RESOURCE_NOT_FOUND = 1017,
  INTERNAL_SERVER_ERROR = 1018,
  BAD_REQUEST = 1019,
  SOMETHINKS_WENT_WRONG = 1020,
  TOKEN_VERIFICATION_FAILD = 1021,
  USER_DOES_NOT_HAVE_THE_REQUIRED_ROLE = 1022,
  RESERVATION_DATE_IS_NOT_EMPTY = 1030,
  EMAIL_OR_PASSWORD_WRONG = 1050,
}
