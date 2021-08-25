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
							account => $final['account'],
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
		}else{
			echo "invalid request";
		}

	}

	public function getTasks(){

		$access =  $this->check_auth();
		

		if($access){
			$data2 = [
				work_id => $this->input->get('workId')
			];
			$query = $this->db->get_where('users',$data2);
			$final = $query->row_array();
			$account = $final['account'];
			if($account == "manager"){
				//for manager
				$data = [
					author_work_id => $this->input->get('workId')
	
				];
			}
			if($account == "employee"){
				//for employee
				$data = [
					user_work_id => $workId
	
				];
			}

			
			$query = $this->db->get_where('tasks',$data);
			$final2 = $query->result();
			$results = [
				tasks => $final2,
				res => "correct"
			];
			echo json_encode($results);
		}

	}
	public function deleteEmployee(){

		$access = $this->check_auth();
		$workId = $this->input->get('deleteWorkId');
		
		
		//echo $workId;
		
		if($access && isset($workId)){
			$data = [
				work_id => $this->input->get('workId')
			];
			$query = $this->db->get_where('users',$data);
			$final = $query->row_array();
			$account = $final['account'];
			if("manager" == "manager"){
				try{
					$data2 = [
						work_id => $workId
					];
					$this->db->delete('users',$data2);
					$results = [
						res => "correct"
					];
					echo json_encode($results);
				}catch(Throwable $e){
	
				}
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
	public function createTask(){
		$access = $this->check_auth();
		$description = $this->input->get("description");
		$author = $this->input->get("author");
		$title  = $this->input->get("title");
		$employeeFor = $this->input->get("employeeFor");

		if($access &&isset($description,$title,$employeeFor)){
			try{
				$data = [
					title => $title,
					description => $description,
					user => $employeeFor,
					author => $author,
					
					state => "open",
				];
				$this->db->insert('tasks',$data);
				$results = [
					res => "correct"
				];
				echo json_encode($results);
			}catch(Throwables $e){
				echo "errr";
			}
		}else{
			echo "invalid request";
		}
	}
}




?>