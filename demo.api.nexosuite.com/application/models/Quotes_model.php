<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Quotes_model extends CI_Model 
{
	



	public function get_order_by_quotes_id($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('orders');
            $this->db->where('quotes_id', $id);
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




	public function get_quotes_by_client($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('quotes');
            $this->db->where('category_id', $id);
			$this->db->order_by('created_at','DESC');

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



public function count_quotes($id)
	{
	$this->db->select('*');
	$this->db->from('quotes');
	$this->db->where('quotes.user_id', $id);

	echo $this->db->count_all_results();

	}




public function count_total_quotes($id)
	{
   $query = $this->db->query("select id, sum(total) as total_amt from quotes WHERE user_id = '$id'");

				foreach ($query->result() as $row)
				{
				    echo $row->total_amt;
				}

	
	}





public function get_list($user_id, $_start, $_limit, $_sort, $category_name, $category_description)
	{

			$this->db->select('*');
            $this->db->from('quotes');
			//$this->db->like('works.category_name', $category_name);
			//$this->db->like('works.category_description', $category_description);
			$this->db->where('quotes.user_id', $user_id);

			 if($category_name!=NULL && $category_description!=NULL)
				{
				//$this->db->where('created_at >=',$startup_startDate); 
	            //$this->db->where('created_at <=',$startup_endDate);
				$this->db->where("quotes.created_at BETWEEN '".$category_name."' AND '".$category_description."'");
			   }



			$this->db->order_by('id', 'DESC'); 
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






public function count_quotes_search($category_name=NULL, $category_description=NULL, $user_id)
	{
	$this->db->select('*');
	$this->db->from('quotes');
	$this->db->where('quotes.user_id', $user_id);

	if($category_name!=NULL && $category_description!=NULL)
			{
			//$this->db->where('created_at >=',$startup_startDate); 
            //$this->db->where('created_at <=',$startup_endDate);
			$this->db->where("quotes.created_at BETWEEN '".$category_name."' AND '".$category_description."'");
		   }
	
	return $this->db->count_all_results();
	
	}




	public function get_quotes_by_appointment_id($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('quotes');
            $this->db->where('appointment_id', $id);
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


	public function get_quotes_by_appointments($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('quotes');
            $this->db->where('appointment_id', $id);
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

	public function get_quotes($id)
	{

			$this->db->select('*');
            $this->db->from('quotes');
			$this->db->where('quotes.user_id', $id);

			$this->db->order_by('created_at','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}


	public function get_id($id)
	{

		$this->db->select('quotes.*, u.first_name, u.last_name');
			$this->db->from('quotes');
			$this->db->join('users u', 'u.id=quotes.user_id');
			$this->db->where('quotes.id', $id);
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
		$this->db->insert('quotes', $blogData);
		return $this->db->insert_id();
	}




	public function update($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('quotes', $blogData);
	}


	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('quotes');
	}


}
