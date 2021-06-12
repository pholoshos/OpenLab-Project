<?php 
$survername = "localhost";
$username = "username";
$password = "";
$dbname = "login";
try{$conn = new PDO("mysql: host=$survername;
dbname=$dbname",$username,$password);
   
    $conn->setAttribute(PDO::ATTR_ERRMODE.PDO::ERRMODE_EXCEPTION);
    
    
    //login define vars and assign zero
    $name = $password = $nameErr $passwordErr =$err = "";
    
    
    //validating form inputs
    if ($_SERVER["REQUEST METHOD"] == "POST"){
      //check if user name is empty
      if(empty(test_input($_POST["name"]))){
        $nameErr="enter username";
        
      }
      else{
      $name= test_input($_POST(["name"]);
      }
       if(empty(test_input($_POST["password"]))){
        $passwordErr="enter password";
        
   }  else{
      $password= test_input($_POST(["password"]);
      }
   //VALIDATE LOGGIN COORDINATES  
       if(empty($nameErr)&&empty($password)){
       
         $stmt=$conn->query("SELECT id FROM 'user' WHERE  name= '$name' and password = '$password';");
         if($stmt->execute()){
         if($stmt->rowcount()==1){
           session_start();
           $_SESSION["name"] =$name;
           header("location: welcome.php");
           
         }else{
           $error = "username or password didnt match";
         }
       }
                            
catch(PDOException $e)
{
  echo "error: ".$e->getMessage(); 
}
                        
function test_input($data){
  $data =trim($data);
  $data =stripcslashes($data);
  $data =htmlspecialchars($data);
  return $data;
}
?>

<!DOCTYPE html>
 <html lang="en"> 
<head>
<meta charset="utf-8">
<title>login</title>
<link rel="stylesheet" type="text/css" href="logstyle.css" />
</head>
<body>
<div class="container">
  <section id="content">
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF")?>">
      <h1>Login Form</h1>
      <div>
        <input type="text" placeholder="Username" required="" id="username" />
      </div>
      <div>
        <input type="password" placeholder="Password" required="" id="password" />
      </div>
      <div>
        <input type="submit" value="Log in" />
        <a href="#">Lost your password?</a>
        <a href="#">Register</a>
      </div>
    </form><!-- form -->
    
  </section><!-- content -->
</div><!-- container -->
</body>
</html>

