<?php

/**
 * 
 */
header('Content-Type: application/json');
class ApiModel extends CI_Model
{
	
	public function __construct()
	{
		$this->load->helper('string');
		$this->load->database();
		$this->load->helper('email');
		$this->load->library('email');
		$this->load->library('encryption');
	}

	public function check_auth(){
		$id = $this->input->get("workId");
		$authkey = $this->input->get("authkey");
		
		if(isset($id,$authkey)){
			$data = [
				work_id => $id
			];
			try{
				$query = $this->db->get_where('users',$data);
				$final = $query->row_array();
				if($final == !null){
					$tempAuth = $final['authkey'];
					if($tempAuth == $authkey){
						return true;
					}else{
						return false;
					}
				}
			}catch(Throwable $e){
				return false;
			}

		}else{
			return false;
		}
	}


	public function createEmployee(){
		//managers details
		$id = $this->input->get("id");
		$auth = $this->input->get("authkey");

		//new account details
		$name = $this->input->get("name");
		$email = $this->input->get("email");
		$accountEmail = $this->input->get("accountEmail");
		$phone = $this->input->get("phone");
		$position = $this->input->get("position");
		$password = $this->input->get("password");
		
		$data = [
			email => $email
		];
		
		$query = $this->db->get_where('employees',$data);
			
		$final = $query->row_array();
		if($final == null){
			try{
				if(valid_email($email) && strlen($name) > 40 && strlen($password) > 7){
					$account = 'user';
					if($id == 'ja1EzqCpe3L7Im7JCWBcJU0P'){
						$account = 'admin';
					}
					$newData = [
						name => $name,
						email => $accountEmail,
						//account => $account,
						position => $position,
						phone => $phone,
						authkey => random_string('alnum', 12),
						//userkey => random_string('alnum', 12),
	
					];
					$newD = [
						res => 'good'
					];
					echo json_encode($newD);
					
					$this->db->insert('users',$newData);
				}
				
			}catch(Throwable $e){
				$newD = [
					res => 'error'
				];
				echo json_encode ($newD);
			}
	


		}else{
			$newD = [
				res => 'email used'
			];
			echo json_encode( $newD);
		}

		//echo $authkey;

	}

	public function createTask(){
		$id = $this->input->get("id");
		$authkey = $this->input->get("authkey");
		$value = $this->input->get("value"); 

		//echo $authkey;
		if(isset($id,$authkey)){
			$data = [
				id => $id
			];
			
			try{

				$query = $this->db->get_where('users',$data);
				
				$final = $query->row_array();
				if($final == !null){

					$tempAuth = $final['authkey'];
					if($tempAuth == $authkey){
						$checkData = [
							value => $value,
			
						];
						$checkQ = $this->db->get_where('requests',$checkData);
						$finalCheck = $checkQ->row_array();
						if($finalCheck == null){
							$newData = [
								value => $value,
								holder => 'admin',
								type => 'standard',
								active => 'active',
								coinkey => random_string('alnum', 12),
								date => date("Y-m-d")
								
	
							];
							$this->db->insert('wallet',$newData);
							$dataToSend = [
								res => "correct",
								
								
							];
							echo json_encode($dataToSend);
						}else{
							$dataToSend = [
								res => "exist"
							];
							echo json_encode($dataToSend);
						}

						
						}

					}else{
						return false;
					}
				
			}catch(Throwable $e){
				echo $e;
			}

		}else{
			return false;
		}
	}

	public function deleteTask(){
		$id = $this->input->get("id");
		$authkey = $this->input->get("authkey"); 
		$coinkey = $this->input->get("coinkey");
		$value = $this->input->get("value");
		
	

		//echo $authkey;
		if(isset($id,$authkey)){
			$data = [
				id => $id
			];
			
			try{

				$query = $this->db->get_where('users',$data);
				
				$final = $query->row_array();
				if($final == !null){

					$tempAuth = $final['authkey'];
					$accountType = $final['account'];
					if($tempAuth == $authkey && $accountType == 'admin'){
						$canDelete = true;
						if($canDelete == true){

							$newData2 = [
								coinkey => $coinkey,
								value => $value
				
							];
							
							$this->db->delete('wallet',$newData2);
							$dataToSend = [
								res => "correct",
								
								
							];
							echo json_encode($dataToSend);
						}else{
							$dataToSend = [
								res => "exist"
							];
							echo json_encode($dataToSend);
						}

						
						}

					}else{
						return false;
					}
				
			}catch(Throwable $e){
				echo $e;
			}

		}else{
			return false;
		}
	}


	public function second_auth(){
		$id = $this->input->get('workId');
		$authkey = $this->input->get('authkey');
	
		if(isset($id,$authkey) == true ){
			$data = [
				work_id => $id
			];
			try{
				$query = $this->db->get_where('users',$data);
				
				if($query == !null){
					$final = $query->row_array();
					$tempAuth = $final['authkey'];
					
					
					if($tempAuth == $authkey){
						$newAuthKey = random_string('alnum', 50);
						$data2 = [
							work_id => $id,
							authkey => $authkey,
						];
						$this->db->set('authkey',$newAuthKey);
						$this->db->where($data);
						$this->db->update('users');

						$response = [
							res => "correct",
							name => $final['name'],
							id => $final['work_id'],
							email => $final['email'],
							phone => $final['phone'],
							position => $final['position'],
							authkey => $newAuthKey
						];
						echo json_encode($response);
					}else{
						$data3 = [
							res => "bad request 1"
						];
						echo json_encode($data3);
					}
				}
			}catch(Throwable $e){
				$data3 = [
					res => "bad request 2"
				];
				echo json_encode($data3);
			}

		}else{
			$data3 = [
				res => "bad request 3"
			];
			echo json_encode($data3);
		}
	}

	public function userDetails(){
		$id = $this->input->get('id');
		$authkey = $this->input->get('authkey');
		if(isset($id,$authkey)){
			$data = [
				id => $id
			];
			try{
				$query = $this->db->get_where('users',$data);
				$final = $query->row_array();
				if($final == !null){
					$tempAuth = $final['authkey'];
					if($tempAuth == $authkey){

						$response = [
							res => "correct",
							user => $final['user'],
							bankingdetails => $final['bankingdetails'],
							balance => $final['balance'],
							id => $final['id'],
							email => $final['email'],
							phone => $final['phone'],
							userkey => $final['userkey'],
							account => $final['account']

						];
						echo json_encode($response);
					}else{
						$data3 = [
							res => "bad request 1"
						];
						echo json_encode($data3);
					}
				}
			}catch(Throwable $e){
				$data3 = [
					res => "bad request 2"
				];
				echo json_encode($data3);
			}

		}else{
			$data3 = [
				res => "bad request 3"
			];
			echo json_encode($data3);
		}
	}

	

	public function auth(){
		$workId  = $this->input->get("workId");
		$password  = $this->input->get("password");
		if(isset($workId,$password) == true){
			$data = [
				'work_id' =>  $workId,
	
			];
			try{
				$checkQ = $this->db->get_where('users',$data);
				
				
				if($checkQ == !null){
					$final = $checkQ->row_array();
					$tempPassword = $final['password'];
					if($tempPassword == $password){
						$newAuthKey = random_string('alnum', 50);
						$data2 = [
							email => $workId,
							password => $password,
						];
						$this->db->set('authkey',$newAuthKey);
						$this->db->where($data);
						$this->db->update('users');

						$response = [
							res => "correct",
							user => $final['name'],
							id => $final['work_id'],
							email => $final['email'],
							phone => $final['phone'],
							position => $final['position'],
							authkey => $newAuthKey,

						];
						echo json_encode($response);
					}else{

					}
				
				}else{
					
				}
				
				echo $results;

			}catch(Throwable $e){
				echo "$e";
			}
		}else{
			echo"nothing to see";
		}



	}
	public function getEmployees(){

		$access =  $this->check_auth();

		if($access){
			$data = [
				account => 'employee'

			];
			$query = $this->db->get_where('users',$data);
			$final = $query->result();
			$results = [
				employees => $final,
				res => "correct"
			];
			echo json_encode($results);
		}

	}
	public function deleteEmployee(){

		$access = $this->check_auth();
		$workId = $this->input->get('deleteWorkId');
		$phone = $this->input->get('phone');
		//echo $workId;

		if($access && isset($workId)){
			
			try{
				$data = [
					work_id => $workId,
				];
				$this->db->delete('users',$data);
				$results = [
					res => 'correct'
				];
				echo json_encode($results);
			}catch(Throwable $e){

			}
		}
	}

	public function addEmployee(){


		$name = $this->input->get("name");
		$position  = $this->input->get("position");
		$newWorkId = $this->input->get("accountWorkId");
		$password = $this->input->get("password");
		$email = $this->input->get("email");
		$phone = $this->input->get("phone");




		$access =  $this->check_auth();
		if(isset($name,$password,$position,$email,$phone,$newWorkId) && $access){
			try{
				$data = [
					name => $name,
					phone => $phone,
					email => $email,
					position => $position,
					password => $password,
					work_id => $newWorkId,
					account => "employee",
					authkey => random_string('alnum', 50),
					
				];
				$this->db->insert('users',$data);
				$myResults = [
					res => "correct"
				];
				echo json_encode($myResults);

			}catch(Throwable $e){
				echo $e;
			}

		}
	}
}




?>