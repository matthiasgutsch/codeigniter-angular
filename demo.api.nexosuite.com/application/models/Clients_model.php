<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Clients_model extends CI_Model 
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


	public function get_clients()
	{
			$this->db->select('*');
            $this->db->from('clients');
            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

	}







public function get_list($user_id, $_start, $_limit, $_sort, $category_name, $category_description)
	{

			$this->db->select('*');
            $this->db->from('clients');
			$this->db->like('clients.name', $category_name);
			$this->db->like('clients.surname', $category_description);
			$this->db->where('clients.user_id', $user_id);


			$this->db->order_by('clients.username', 'ASC'); 
			if ($_start == 0 &&  $_limit != '') {
	            $this->db->limit($_limit);
	        } else if ($_start != 0  && $_limit != '') {
	            $this->db->limit($_limit,$_start);
	        }


		    $query  = $this->db->get();
			
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return array();
            }
}



	

	public function count_clients_search($category_name=NULL, $category_description=NULL, $user_id)
	{
	$this->db->select('*');
	$this->db->from('clients');
	$this->db->where('clients.user_id', $user_id);

	if($category_name!=NULL)
    $this->db->like('name', $category_name);
	if($category_description!=NULL)
    $this->db->like('surname', $category_description);
	
	return $this->db->count_all_results();
	
	}






	public function get_client_name($id) {

            $this->db->select('*');
            $this->db->from('clients');
            $this->db->where('clients.id', $id);
			$query = $this->db->get();
			return $query->row();

    }




	public function get_clients_user($id)
	{
			$this->db->select('*');
            $this->db->from('clients');
			$this->db->where('clients.user_id', $id);
			$this->db->where('clients.is_active', 1);

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

	}



	public function count_clients($id)
	{
	$this->db->select('*');
	$this->db->from('clients');
	$this->db->where('clients.user_id', $id);

	echo $this->db->count_all_results();

	}








	public function checkToken($token)
	{
		$this->db->where('token', $token);
		$query = $this->db->get('users');

		if($query->num_rows() == 1) {
			return true;
		}
		return false;
	}


	public function get_id($id)
		{
			$this->db->select('clients.*, u.first_name, u.last_name');
			$this->db->from('clients');
			$this->db->join('users u', 'u.id=clients.user_id');
			$this->db->where('clients.id', $id);
			$query = $this->db->get();
			return $query->row();
	}


	public function search($id)
		{

			$this->db->select('*');
			$this->db->from('clients');
			$this->db->where('clients.username', $id);
			$query = $this->db->get();
			return $query->row();
	}


	public function create($blogData)
	{
		$this->db->insert('clients', $blogData);
		return $this->db->insert_id();
	}

	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('clients');
	}



	public function update($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('clients', $blogData);
	}



}
