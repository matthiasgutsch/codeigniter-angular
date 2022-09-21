<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class products_variations_model extends CI_Model 
{
	

	public function get_products_variations_by_client($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('products_variations');
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


public function get_products_variations_by_product_public($id)
	{

			$this->db->select('*');
            $this->db->from('products_variations');
			$this->db->where('products_variations.product_id', $id);

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}


public function find_products_variations($id, $user_id)
	{

			$this->db->select('*');
            $this->db->from('products_variations');
			$this->db->like('products_variations.code', $id);
			$this->db->where('products_variations.user_id', $user_id);
			$this->db->where('products_variations.is_active', 1);

			$this->db->order_by('id', 'DESC'); 
			
		    $query  = $this->db->get();
			
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return array();
            }

	

}



public function get_products_variations_calendar()
	{

			$this->db->select('*');
            $this->db->from('products_variations');
			$this->db->where('is_featured', '1');
			$this->db->order_by('date','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}
	
	public function update_quantity_product($id, $blogData)
	{


		$this->db->where('id', $id);
		$this->db->set('pieces', '2', FALSE);
		$this->db->update('products_variations', $blogData);
		$this->db->update('products_variations.pieces');
	}




public function get_products_variations($user_id)
	{

			$this->db->select('*');
            $this->db->from('products_variations');
			$this->db->where('products_variations.user_id', $user_id);
			$this->db->where('products_variations.is_active', 1);

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}


public function get_products_variations_by_product($id, $user_id)
	{

			$this->db->select('*');
            $this->db->from('products_variations');
			$this->db->where('products_variations.product_id', $id);
			$this->db->where('products_variations.user_id', $user_id);

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}


	public function count_products_variations($id)
	{
	$this->db->select('*');
	$this->db->from('products_variations');
	$this->db->where('products_variations.user_id', $id);

	echo $this->db->count_all_results();

	}





public function get_products_variations_date($current_month=NULL)
	{

			$date = new DateTime("now");
			$curr_date = $date->format('Y-m-d ');
			$this->db->select('*');
            $this->db->from('products_variations');
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

		$this->db->select('products_variations.*, u.first_name, u.last_name');
			$this->db->from('products_variations');
			$this->db->join('users u', 'u.id=products_variations.user_id');
			$this->db->where('products_variations.id', $id);
			$query = $this->db->get();
			return $query->row();
	}


	public function get_image_name($id)
	{

			$this->db->select('products_variations.*, u.first_name, u.last_name');
			$this->db->from('products_variations');
			$this->db->join('users u', 'u.id=products_variations.user_id');
			$this->db->where('products_variations.id', $id);
		    $row = $this->db->get()->row();
		    if (isset($row)) {
		        return $row->image;
		    } else {
		        return false;
		    }

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
		$this->db->insert('products_variations', $blogData);
		return $this->db->insert_id();
	}




	public function update($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('products_variations', $blogData);
	}


	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('products_variations');
	}


}
