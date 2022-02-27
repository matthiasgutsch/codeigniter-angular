<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Paged_model extends CI_Model 
{
	

	public function get_products_by_client($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('products');
            $this->db->where('category_id', $id);
			$this->db->order_by('date','DESC');

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



public function get_products_calendar()
	{

			$this->db->select('*');
            $this->db->from('products');
			$this->db->where('is_featured', '1');
			$this->db->order_by('date','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}
	

public function get_products($user_id)
	{

			$this->db->select('*');
            $this->db->from('products');
			$this->db->where('products.user_id', $user_id);

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}


public function get_products_list_by_user($user_id, $_start, $_limit, $code, $code_int, $works_id, $category_id)
	{

			$this->db->select('*');
            $this->db->from('products');
			$this->db->where('products.user_id', $user_id);
			$this->db->like('code', $code);
			$this->db->like('code_int', $code_int);
			$this->db->like('works_id', $works_id);
			$this->db->like('category_id', $category_id);

		
			if ($_start == 0 &&  $_limit != '') {
	            $this->db->limit($_limit);
	        } else if ($_start != 0  && $_limit != '') {
	            $this->db->limit($_start, $_limit);
	        }

		
		    $query  = $this->db->get();
			
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return array();
            }

	}



public function count_products($user_id)
	{
	$this->db->select('*');
	$this->db->from('products');
	$this->db->where('products.user_id', $user_id);

	return $this->db->count_all_results();
	
	}





public function get_products_date($current_month=NULL)
	{

			$date = new DateTime("now");
			$curr_date = $date->format('Y-m-d ');
			$this->db->select('*');
            $this->db->from('products');
			$this->db->where('date(Date)',$curr_date);//use date function
			$this->db->order_by('date','ASC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}


	public function get_id($id)
	{

		$this->db->select('products.*, u.first_name, u.last_name');
			$this->db->from('products');
			$this->db->join('users u', 'u.id=products.user_id');
			$this->db->where('products.id', $id);
			$query = $this->db->get();
			return $query->row();
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


	public function checkToken($token)
	{
		$this->db->where('token', $token);
		$query = $this->db->get('users');

		if($query->num_rows() == 1) {
			return true;
		}
		return false;
	}

	public function create($blogData)
	{
		$this->db->insert('products', $blogData);
		return $this->db->insert_id();
	}




	public function update($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('products', $blogData);
	}


	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('products');
	}


}
