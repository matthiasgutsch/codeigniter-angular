<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Employee_model extends CI_Model 
{
	public function get_blogs($featured, $recentpost)
	{
		$this->db->select('blog.*, cat.category_name, u.first_name, u.last_name');
		$this->db->from('blogs blog');
		$this->db->join('users u', 'u.id=blog.user_id');
		$this->db->join('categories cat', 'cat.id=blog.category_id', 'left');
		$this->db->where('blog.is_active', 1);

		if($featured) {
			$this->db->where('blog.is_featured', 1);
		}
		if($recentpost){
			$this->db->order_by('blog.created_at', 'desc');
			$this->db->limit($recentpost);
		}
		$query = $this->db->get();
		return $query->result();
	}

	public function get_blog($id)
	{
		$this->db->select('blog.*, cat.category_name, u.first_name, u.last_name');
		$this->db->from('blogs blog');
		$this->db->join('users u', 'u.id=blog.user_id');
		$this->db->join('categories cat', 'cat.id=blog.category_id', 'left');
		$this->db->where('blog.is_active', 1);
		$this->db->where('blog.id', $id);
		$query = $this->db->get();
		return $query->row();
	}

	public function get_appointments($id)
	{
		$this->db->select('appointments.*, cat.category_name, u.first_name, u.last_name');
		$this->db->from('blogs blog');
		$this->db->join('users u', 'u.id=blog.user_id');
		$this->db->join('categories cat', 'cat.id=blog.category_id', 'left');
		$this->db->where('blog.is_active', 1);
		$this->db->where('blog.id', $id);
		$query = $this->db->get();
		return $query->row();
	}

	public function get_categories()
	{
		$query = $this->db->get('categories');
		return $query->result();
	}

	public function get_page($slug)
	{
		$this->db->where('slug', $slug);
		$query = $this->db->get('pages');
		return $query->row();
	}

	public function insert_contact($contactData)
	{
		$this->db->insert('contacts', $contactData);
		return $this->db->insert_id();
	}

	public function login($username, $password) 
	{
		$this->db->where('username', $username);
		$this->db->where('password', md5($password));
		$query = $this->db->get('users');

		if($query->num_rows() == 1) {
			return $query->row();
		}
	}



	public function get_employee_name($id) {

            $this->db->select('*');
            $this->db->from('startup_attachments');
            $this->db->where('startup_id', $id);
            $this->db->where('application_images', 0);
			$row = $this->db->get()->row();
		    if (isset($row)) {
		        return $row->image_name;
		    } else {
		        return false;
		    }

    }




public function get_list($user_id, $_start, $_limit, $_sort, $category_name, $category_description)
	{

			$this->db->select('*');
            $this->db->from('employees');
			$this->db->like('employees.name', $category_name);
			$this->db->like('employees.surname', $category_description);
			$this->db->where('employees.user_id', $user_id);


			$this->db->order_by('employees.username', 'ASC'); 
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



	

	public function count_employees_search($category_name=NULL, $category_description=NULL, $user_id)
	{
	$this->db->select('*');
	$this->db->from('employees');
	$this->db->where('employees.user_id', $user_id);

	if($category_name!=NULL)
    $this->db->like('name', $category_name);
	if($category_description!=NULL)
    $this->db->like('surname', $category_description);
	
	return $this->db->count_all_results();
	
	}




	public function get_employees()
	{
			$this->db->select('*');
            $this->db->from('employees');
            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

	}


	public function get_employees_user($id)
	{
			$this->db->select('*');
            $this->db->from('employees');
			$this->db->where('employees.user_id', $id);
            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

	}



	public function count_employees($id)
	{
	$this->db->select('*');
	$this->db->from('employees');
	$this->db->where('employees.user_id', $id);

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
			$this->db->select('employees.*, u.first_name, u.last_name');
			$this->db->from('employees');
			$this->db->join('users u', 'u.id=employees.user_id');
			$this->db->where('employees.id', $id);
			$query = $this->db->get();
			return $query->row();
	}


	public function create($blogData)
	{
		$this->db->insert('employees', $blogData);
		return $this->db->insert_id();
	}

	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('employees');
	}



	public function update($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('employees', $blogData);
	}



}
