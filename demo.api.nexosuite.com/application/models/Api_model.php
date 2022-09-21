<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Api_model extends CI_Model 
{
	

	public function login($username, $password) 
	{
		$this->db->where('username', $username);
		$this->db->where('password', md5($password));
		$query = $this->db->get('users');

		if($query->num_rows() == 1) {
			return $query->row();
		}
	}

	
	function create_token ($username) {
		    $this->load->database();
		
		    // ***** Generate Token *****
		    $char = "AbCdEf123456";
		    $token = '';
		    for ($i = 0; $i < 300; $i++) $token .= $char[(rand() % strlen($char))];
		
		    // ***** Insert into Database *****
		    $sql = "UPDATE users SET token = '$token' WHERE id = $username;";
		    $this->db->query($sql, $token);
		
		    return  $token;
		}   




	public function checkToken($token, $user_id)
	{
		$this->db->where('token', $token);
		$this->db->where('id', $user_id);
		$query = $this->db->get('users');

		if($query->num_rows() == 1) {
			return true;
		}
		return false;
	}

	
}
