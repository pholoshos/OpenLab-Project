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
		$id = $this->input->get("id");
		$authkey = $this->input->get("authkey");
		echo $authkey;
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

	public function approveRequest(){
		$id = $this->input->get("id");
		$authkey = $this->input->get("authkey");
		$holder = $this->input->get("holder"); 
		$coinkey = $this->input->get("coinkey");
		$value = $this->input->get("value");
		$userkey = $this->input->get("userkey");
		$email = $this->input->get("email");
		$phone = $this->input->get("phone");
		$username = $this->input->get("name");

		
		if(isset($id,$authkey)){
			$data = [
				id => $id
			];
			
			try{

				$query = $this->db->get_where('users',$data);
				
				$final = $query->row_array();
				
				if($final != null){

					$tempAuth = $final['authkey'];
					$accountType = $final['account'];
					if($tempAuth == $authkey && $accountType == 'admin'){
						
						$checkData = [
							value => $value,
							coinkey => $coinkey,	
							results => "approved"
						];
						
						$checkQ = $this->db->get_where('requests',$checkData);
						$finalCheck = $checkQ->row_array();
						if($finalCheck == null){

							$newData2 = [
								coinkey => $coinkey,
								holder => $holder,


							];
							$this->db->set('results','approved');
							$this->db->where($newData2);
							$this->db->update('requests');
							$newData3 = [
								holder => $holder,
								value =>$value,
								coinkey => random_string('alnum', 12),
								type => 'standard',
								state => 'active',
								holderid => $id,
								userkey => $userkey,
								withdrawdate => '',
								useremail => $email,
								userphone => $phone,
								username => $username,
								date =>  date("Y-m-d"),
							];
							$this->db->insert('usercoins',$newData3);

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
						echo "helo";
						return false;
					}
				
			}catch(Throwable $e){
				echo $e;
				echo "helo";
			}

		}else{
			echo "helo";
			return false;
		}
	}
	public function approveWithdrawal(){
		$id = $this->input->get("id");
		$authkey = $this->input->get("authkey");
		$holder = $this->input->get("holder"); 
		$coinkey = $this->input->get("coinkey");
		$value = $this->input->get("value");
		$userkey = $this->input->get("userkey");

		
		if(isset($id,$authkey)){
			$data = [
				id => $id
			];
			
			try{

				$query = $this->db->get_where('users',$data);
				
				$final = $query->row_array();
				
				if($final != null){

					$tempAuth = $final['authkey'];
					$accountType = $final['account'];
					if($tempAuth == $authkey && $accountType == 'admin'){
						
						$checkData = [
							value => $value,
							coinkey => $coinkey,	
							results => "paid"
						];
						
						$checkQ = $this->db->get_where('requests',$checkData);
						$finalCheck = $checkQ->row_array();
						if($finalCheck == null){

							$newData2 = [
								coinkey => $coinkey,
								holder => $holder,


							];
							$this->db->set('state','paid');
							$this->db->where($newData2);
							$this->db->update('usercoins');

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
						echo "helo";
						return false;
					}
				
			}catch(Throwable $e){
				echo $e;
				echo "helo";
			}

		}else{
			echo "helo";
			return false;
		}
	}
	//requests
	public function userRequests(){
		$id = $this->input->get("id");
		$authkey = $this->input->get("authkey");
		$userkey =  $this->input->get("userkey");
	
		//echo $authkey;
		if(isset($id,$authkey)){
			$data = [
				id => $id,

			];
			
			try{
				$query = $this->db->get_where('users',$data);
				$final = $query->row_array();
				if($final == !null){
					$tempAuth = $final['authkey'];
					$accountType = $final['account'];
					if($tempAuth == $authkey && $accountType == 'admin'){
						$newData = [
							
							results => 'none',


						];
						$newQuery = $this->db->get_where('requests',$newData);
						$final = $newQuery->result();
						if($final != null){
							$dataToSend = [
								res => "correct",
								requests => $final
							];
							echo json_encode($dataToSend);
						}else{
							$dataToSend = [
								res => "bad",
								
							];
							echo json_encode($dataToSend);
						}

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

	//request which are accepted for user
	public function userReq2(){
		$id = $this->input->get("id");
		$authkey = $this->input->get("authkey");
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
						$newData = [
							
							results => 'approved',
							requester => $id,

						];
						$newQuery = $this->db->get_where('requests',$newData);
						$final = $newQuery->result();
						if($final != null){
							$dataToSend = [
								res => "correct",
								requests => $final
							];
							echo json_encode($dataToSend);
						}else{
							$dataToSend = [
								res => "bad",
								
							];
							echo json_encode($dataToSend);
						}

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
	public function withdrawals(){
		$id = $this->input->get("id");
		$authkey = $this->input->get("authkey");
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
					if($tempAuth == $authkey  && $final['account'] == 'admin'){
						$newData = [state => 'requested'];
						
						$newQuery = $this->db->get_where('usercoins',$newData);
						$final2 = $newQuery->result();
						$dataToSend = [
							res => "correct",
							coins => $final2
						];
						echo json_encode($dataToSend);
						
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


	public function second_auth(){
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
						$newAuthKey = random_string('alnum', 100);
						$data2 = [
							id => $id,
							authkey => $authkey,
						];
						$this->db->set('authkey',$newAuthKey);
						$this->db->where($data);
						$this->db->update('users');

						$response = [
							res => "correct",
							user => $final['user'],
							id => $final['id'],
							email => $final['email'],
							phone => $final['phone'],
							userkey => $final['userkey'],
							account => $final['account'],
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
		$email  = $this->input->get("email");
		$password  = $this->input->get("password");
		
		if(isset($email,$password)){
			
			$data = [
				'email' =>  $email,
	
			];
			try{

				$query = $this->db->get_where('users',$data);
				$final = $query->row_array();
				if($final == !null){
					$tempPassword = $final['password'];
					if($tempPassword == $password){
						$newAuthKey = random_string('alnum', 100);
						$data2 = [
							email => $email,
							password => $password,
						];
						$this->db->set('authkey',$newAuthKey);
						$this->db->where($data);
						$this->db->update('users');

						$response = [
							res => "correct",
							user => $final['user'],
							id => $final['id'],
							email => $final['email'],
							phone => $final['phone'],
							authkey => $newAuthKey,
							userkey => $final['userkey'],
							account => $final['account']
							

						];
						echo json_encode($response);
					}else{

					}
				
				}
				
				echo($results);

			}catch(Throwable $e){
				echo "$e";
			}
		}else{
			echo"nothing to see";
		}



	}
	public function login(){

	}




?>