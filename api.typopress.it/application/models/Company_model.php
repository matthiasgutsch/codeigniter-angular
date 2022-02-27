<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Company_model extends CI_Model 
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

	public function get_clients()
	{
	$query = $this->db->get('clients');
		return $query->result();

	}



	public function count_clients()
	{
	$this->db->select('*');
	$this->db->from('clients');
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
			$this->db->select('company.*, u.first_name, u.last_name');
			$this->db->from('company');
			$this->db->join('users u', 'u.id=company.user_id');
			$this->db->where('company.id', $id);
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
		$this->db->update('company', $blogData);
	}



}
