const router= require('express');

router.post('/register',registerUser);
router.post('/login',loginUser);


module.exports=router;