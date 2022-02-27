<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Api_model extends CI_Model 
{
	public function get_blogs($id)
	{

		$this->db->select('blog.*, u.first_name, u.last_name');
		$this->db->from('blogs blog');
		$this->db->join('users u', 'u.id=2');
		$this->db->order_by('blog.created_at', 'desc');
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

	public function get_admin_blogs($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('appointments');
            $this->db->where('category_id', $id);

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

        } else {
            return null;
        }

    }


	public function get_admin_blog($id)
	{
		$this->db->select('blog.*, u.first_name, u.last_name');
		$this->db->from('blogs blog');
		$this->db->join('users u', 'u.id=blog.user_id');
		$this->db->where('blog.id', $id);
		$query = $this->db->get();
		return $query->row();
	}

	public function get_admin_category($id)
	{
		$this->db->select('category.*');
		$this->db->from('categories category');
		$this->db->where('category.id', $id);
		$query = $this->db->get();
		return $query->row();
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

	public function insertBlog($blogData)
	{
		$this->db->insert('blogs', $blogData);
		return $this->db->insert_id();
	}


	public function insertCategory($categoryData)
	{
		$this->db->insert('categories', $categoryData);
		return $this->db->insert_id();
	}


	public function updateBlog($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('blogs', $blogData);
	}

	public function updateCategory($id, $categoryData)
	{
		$this->db->where('id', $id);
		$this->db->update('categories', $categoryData);
	}


	public function deleteBlog($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('blogs');
	}

	public function deleteCategory($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('categories');
	}

}
